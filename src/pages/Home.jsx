import Banner from "../components/banner/Banner";
import NewsLetter from "../components/newsLetter/NewsLetter";
import OurService from "../components/ourService/OurService";
import Ourteam from "../components/ourTeam/Ourteam";
import Stat from "../components/stat/Stat";
import TopRatedDoctors from "../components/topDoc/TopRatedDoctors";
import WhyChooseUs from "../components/whyChooseUs/WhyChooseUs";

const Home = () => {

// console.log(user);
  return (
    <div>
      <Banner/>
      {/* <WhyChooseUs/> */}
      <Stat/>
      <OurService/>
      {/* <TopRatedDoctors/> */}
      <Ourteam/>
      <NewsLetter/>
    </div>
  );
};

export default Home;
