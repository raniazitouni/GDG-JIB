import Profil from "/Assets/navbarAssets/profilpic.svg";
import PropTypes from 'prop-types';
const Navbar = ({ page, name }) => {
  return (
    <div className="flex flex-row justify-between px-16 py-3 bg-WhiteC">
      <p className="text-black font-medium text-2xl py-2">{page}</p>
      <div className="flex flex-row bg-white px-2 py-2 rounded-lg">
        <img
          src={Profil}
          alt="profil"
          className="w-9 h-9 object-contain mx-2"
        />
        <p className="text-black font-base text-xl py-1 pr-2">{name}</p>
      </div>
    </div>
  );
};
Navbar.propTypes = {
  page: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navbar;