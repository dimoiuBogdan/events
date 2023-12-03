import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { HomepageReducerActions } from "./data/reducers/landing.page.reducer.actions";

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const test = useAppSelector<string>((state) => state.homepageReducer.data);

  return (
    <div
      onClick={() => {
        dispatch(HomepageReducerActions.setData("pateu"));
      }}
    >
      Landing.page - {test}
    </div>
  );
};

export default LandingPage;
