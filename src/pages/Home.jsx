import useAuth from "../hook/useAuth";

const Home = () => {
const {user} = useAuth()
// console.log(user);
  return (
    <div className="min-h-screen max-w-xl">
      <p className="text-t-secondary">helll</p>
      <p className="text-t-primary">helll</p>
      <p className="text-t-background">helll</p>
    </div>
  );
};

export default Home;
