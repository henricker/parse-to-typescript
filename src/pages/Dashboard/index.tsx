import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { CreateFoodType, FoodType } from '../../interfaces/food';

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodType | undefined>(undefined);

  useEffect(() => {
    api.get('/foods').then(response => setFoods(() => response.data));
  }, [])

  const handleAddFood = async (food: CreateFoodType) => {
    try {
      const response = await api.post<FoodType>('/foods', {
        ...food,
        available: true,
      });

      setFoods(() => [...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: CreateFoodType) => {
    try {
      if(!editingFood)
        return;

      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setEditingFood(undefined);
      setFoods(() => [...foodsUpdated ]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(() => foodsFiltered);
  }

  const  toggleModal = () => {
    setModalOpen(() => !modalOpen);
  }

  const toggleEditModal = () => {
    setEditModalOpen(() => !editModalOpen);
  }

  const handleEditFood = (food: FoodType) => {
    setEditingFood(() => food);
    setEditModalOpen(() => true);
  }

  return (
    <>
    <Header openModal={toggleModal} />
    <ModalAddFood
      isOpen={modalOpen}
      setIsOpen={toggleModal}
      handleAddFood={handleAddFood}
    />
    <ModalEditFood
      isOpen={editModalOpen}
      setIsOpen={toggleEditModal}
      editingFood={editingFood}
      handleUpdateFood={handleUpdateFood}
    />

    <FoodsContainer data-testid="foods-list">
      {foods &&
        foods.map(food => (
          <Food
            key={food.id}
            food={food}
            handleDelete={handleDeleteFood}
            handleEditFood={handleEditFood}
          />
        ))}
    </FoodsContainer>
  </>
  );
}

export default Dashboard;
