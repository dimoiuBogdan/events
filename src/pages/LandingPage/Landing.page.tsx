import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { LandingPageReducerActions } from "./data/reducers/landing.page.reducer.actions";

const LandingPage = () => {
  const dispatch = useAppDispatch();

  const test = useAppSelector<string>((state) => state.landingPageReducer.data);

  return (
    <div
      onClick={() => {
        dispatch(LandingPageReducerActions.setData("pateu"));
      }}
    >
      Landing.page - {test}
    </div>
  );
};

export default LandingPage;
