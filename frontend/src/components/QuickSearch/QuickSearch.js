// IMPORT DEPENDENCIES
import React, { useState } from "react";
import styled from "styled-components";

// IMPORT COMPONENTS
import { StyledSliderIcon } from "../StyledIcons";

const QuickSearch = () => {
  const [calories, setCalories] = useState(2000);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [timeFrame, setTimeFrame] = useState(`day`);
  const [diet, setDiet] = useState("");
  const [exclude, setExclude] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const reqObject = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(
      `/mealPlan/?targetCalories=${calories}&timeFrame=${timeFrame}&diet=${diet}&exclude=${exclude}`,
      reqObject
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <StyledH1>Quick Meal Plans</StyledH1>
      <ControlsWrapper>
        <InputWrapper>
          <StyledInput
            type="number"
            placeholder="Calories (e.g. 2000)"
            onChange={(e) => {
              setCalories(e.target.value);
            }}
          />
          <SliderButton
            onClick={() => {
              setIsAdvancedSearch(!isAdvancedSearch);
            }}
          >
            <StyledSliderIcon />
          </SliderButton>
        </InputWrapper>
        {isAdvancedSearch && (
          <>
            <StyledSelect
              id="timeFrame"
              name="timeFrame"
              onChange={(e) => {
                setTimeFrame(e.target.value);
              }}
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
            </StyledSelect>
            <StyledSelect
              id="diet"
              name="diet"
              value={diet}
              onChange={(e) => {
                setDiet(e.target.value);
              }}
            >
              <option value="">Pick one (optional)</option>
              <option value="gluten free">Gluten Free</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="lacto-vegetarian">Lacto-Vegetarian</option>
              <option value="ovo-vegetarian">Ovo-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="pescetarian">Pescetarian</option>
              <option value="paleo">Paleo</option>
              <option value="primal">Primal</option>
              <option value="whole30">Whole30</option>
            </StyledSelect>
            <StyledInput
              value={exclude}
              type="string"
              placeholder="Excluding (e.g. milk)"
              onChange={(e) => {
                setExclude(e.target.value);
              }}
            />
          </>
        )}
        <SearchButton onClick={handleSearchSubmit}>Search</SearchButton>
      </ControlsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: var(--color-text);
  margin: var(--margin-page);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StyledH1 = styled.h1`
  display: flex;
  margin-bottom: 5vw;
`;

const ControlsWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const SliderButton = styled.button`
  background: transparent;
  color: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  width: inherit;
  justify-content: center;
  align-items: center;
  column-gap: 2vw;
`;

const StyledSelect = styled.select`
  font-family: var(--font-body);
  font-size: 24px;
  border-radius: 10px;
  color: var(--color-background);
`;

const StyledInput = styled.input`
  font-size: 24px;
  width: inherit;
  border-radius: 10px;
  box-sizing: border-box;
`;

const SearchButton = styled.button`
  margin-top: 15px;
  font-size: 24px;
  width: 100%;
  background-color: var(--color-midground);
  color: var(--color-text);
  border: none;
  box-sizing: border-box;
  border-radius: 10px;

  &:active {
    opacity: 0.5;
  }
`;

export default QuickSearch;
