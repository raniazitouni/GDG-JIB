import { useState } from "react";

function AddInternships() {
  const [formData, setFormData] = useState({
    internshipName: "",
    date: "",
    duration: "",
    type: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      {/* Form Section */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">ADD an Internship</h1>
        <form className="space-y-6">
          <div>
            <label className="block font-medium">Internship Name *</label>
            <input
              type="text"
              name="internshipName"
              value={formData.internshipName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Lorem ipsum"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Duration *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="ex: 2 months"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">ex: Conference</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="ex: Algiers"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Description Of The Internship *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Lorem ipsum"
            ></textarea>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
            >
              ⬇ Upload a picture
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInternships;
