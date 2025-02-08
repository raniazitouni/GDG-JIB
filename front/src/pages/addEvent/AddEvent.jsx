import { useState } from "react";

function AddEvent() {
  const [formData, setFormData] = useState({
    eventName: "",
    wilaya: "",
    type: "",
    domain: "",
    date: "",
    time: "",
    inscriptionLink: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar Placeholder */}
      <div className="w-64 bg-gray-100">
        {/* Sidebar Component Goes Here */}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-8">
        {/* Navbar Placeholder */}
        <div className="mb-6">{/* Navbar Component Goes Here */}</div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6">ADD an Event</h1>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Event Name *</label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Lorem ipsum"
                />
              </div>
              <div>
                <label className="block font-medium">Wilaya *</label>
                <input
                  type="text"
                  name="wilaya"
                  value={formData.wilaya}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Algiers"
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
                <label className="block font-medium">Domaine *</label>
                <input
                  type="text"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="ex: Finance"
                />
              </div>
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
                <label className="block font-medium">Time *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium">Inscription Link *</label>
              <input
                type="url"
                name="inscriptionLink"
                value={formData.inscriptionLink}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Put the link here"
              />
            </div>

            <div>
              <label className="block font-medium">
                Description Of The Event *
              </label>
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
    </div>
  );
}

export default AddEvent;
