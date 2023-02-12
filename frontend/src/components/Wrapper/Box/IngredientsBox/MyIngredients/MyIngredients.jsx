import React, { useState } from 'react';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import KitchenRoundedIcon from '@mui/icons-material/KitchenRounded';
import {
  AppWrap,
  Button,
  Contents,
  Circle,
  FridgeButton,
} from './MyIngredientsStyle';
import AllMyIrngredientsModal from '../../../../Modal/AllMyIngredientsModal/AllMyIngredientsModal';

function MyIngredients({
  category,
  fridge,
  categoryFridges,
  sumbitIngredient,
  favIngredient,
  myFridge,
}) {
  const [visible, setVisible] = useState(false);
  const [selectIngredientId, setselectIngredientId] = useState('');
  const handleClick = i => {
    console.log(i);
    console.log(i?.ingredient);
    setselectIngredientId(i?.ingredient.ingredientId);
    setVisible(!visible);
    console.log(i?.ingredient.ingredientId);
  };
  const [isOpen, setIsOpen] = useState(false);
  const onClickButton = () => {
    setIsOpen(true);
  };
  const handleClickTwo = i => {
    setselectIngredientId(i.ingredientId);
    setVisible(!visible);
    console.log(i.ingredientId);
  };

  const fridgeIngredient = fridge.map(i => {
    console.log(i);
    return (
      <span>
        <Circle
          key={i}
          onClick={() => {
            handleClick(i);
          }}
        >
          <img src={i?.ingredient.ingredientIcon} alt="icon" />
        </Circle>
        {i?.ingredient.ingredientName}
        {selectIngredientId === i?.ingredient.ingredientId && visible && (
          <>
            <Button
              onClick={() => {
                sumbitIngredient(i);
              }}
            >
              <BookmarkAddRoundedIcon />
            </Button>
            <Button
              onClick={() => {
                favIngredient(i);
              }}
            >
              <KitchenRoundedIcon />
            </Button>
          </>
        )}
      </span>
    );
  });

  const categoryFridge = categoryFridges.map(i => {
    return (
      <span>
        <Circle
          key={i}
          onClick={() => {
            handleClickTwo(i);
          }}
        >
          <img src={i.ingredient.ingredientIcon} alt="icon" />
        </Circle>
        {selectIngredientId === i.ingredientId && visible && (
          <>
            <Button
              onClick={() => {
                sumbitIngredient(i);
              }}
            >
              <BookmarkAddRoundedIcon />
            </Button>
            <Button
              onClick={() => {
                favIngredient(i);
              }}
            >
              <KitchenRoundedIcon />
            </Button>
          </>
        )}
      </span>
    );
  });

  const afterPatch = myFridge.map(f => {
    console.log(f);
    return (
      <span>
        <Circle
          key={f}
          onClick={() => {
            handleClickTwo(f);
          }}
        >
          <img src={f.ingredient.ingredientIcon} alt="icon" />
        </Circle>
        {f.ingredient.ingredientName}
        {selectIngredientId === f.ingredient.ingredientId && visible && (
          <>
            <Button
              onClick={() => {
                favIngredient(f);
              }}
            >
              <BookmarkAddRoundedIcon />
            </Button>
            <Button
              onClick={() => {
                sumbitIngredient(f);
              }}
            >
              <KitchenRoundedIcon />
            </Button>
          </>
        )}
      </span>
    );
  });

  if (myFridge.status === 200) {
    return (
      <div>
        <Contents>
          <h4>
            내 냉장고에 있는 재료
            <KitchenRoundedIcon style={{ fontSize: '20px' }} />
          </h4>
          <AppWrap>
            <FridgeButton onClick={onClickButton}>냉장고 전체보기</FridgeButton>
            {isOpen && (
              <AllMyIrngredientsModal
                open={isOpen}
                onClose={() => {
                  setIsOpen(false);
                }}
              />
            )}
          </AppWrap>
          {afterPatch}
        </Contents>
      </div>
    );
  }
  return (
    <div>
      <Contents>
        <h4>
          내 냉장고에 있는 재료
          <KitchenRoundedIcon style={{ fontSize: '20px' }} />
        </h4>
        <AppWrap>
          <FridgeButton onClick={onClickButton}>냉장고 전체보기</FridgeButton>
          {isOpen && (
            <AllMyIrngredientsModal
              open={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}
            />
          )}
        </AppWrap>
        {fridgeIngredient}
      </Contents>
    </div>
  );
}

export default MyIngredients;
