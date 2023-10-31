import DefaultTemplate from "../template/DefaultTemplate";

const Home = () => {
  return (
    <>
      <DefaultTemplate>
        <h1 className=" text-white">
          Home
          <img src="./2.png"></img>
          <img src="./3.png" style={{ width: "35px" }}></img>
        </h1>
      </DefaultTemplate>
    </>
  );
};

export default Home;
