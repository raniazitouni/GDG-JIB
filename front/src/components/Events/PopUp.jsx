import cross from "../../../public/Assets/eventAssets/cross.svg"
import Titre from "./Titre";
export function PopUP({clickHandler , formData , setFormData}) {
  

  function changeHandler(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md">
      
      <Titre text="Formulaire" icon={cross} clickHandler={clickHandler} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Domaine */}
        <div className="flex flex-col">
          <label className="font-medium">Domaine</label>
          <input
            type="text"
            name="Domaine"
            value={formData.Domaine}
            onChange={changeHandler}
            className="border p-2 rounded-md"
            placeholder="Entrez le domaine"
          />
        </div>

        {/* Type */}
        <div className="flex flex-col">
          <label className="font-medium">Type</label>
          <input
            type="text"
            name="Type"
            value={formData.Type}
            onChange={changeHandler}
            className="border p-2 rounded-md"
            placeholder="Entrez le type"
          />
        </div>

        {/* Wilaya */}
        <div className="flex flex-col">
          <label className="font-medium">Wilaya</label>
          <input
            type="text"
            name="Wilaya"
            value={formData.Wilaya}
            onChange={changeHandler}
            className="border p-2 rounded-md"
            placeholder="Entrez la wilaya"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PopUP;
