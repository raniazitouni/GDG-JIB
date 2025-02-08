import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext.jsx";
import { fetchData } from "../../utils/utils";

const DefaultQuestions = () => {
  const { auth } = useContext(AuthContext);
  const user_id = auth?.id_user;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    whyApply: "",
    companyInterest: "",
    gainExperience: "",
  });

  const [savedData, setSavedData] = useState({
    whyApply: "",
    companyInterest: "",
    gainExperience: "",
  });

  useEffect(() => {
    const fetchQuest = async () => {
      const res = await fetchData(
        `http://localhost:8000/profil/quest/${user_id}/`,
        "GET"
      );

      console.log(res);

      if (res.error) {
        console.error("error:", res.error);
      } else {
        setSavedData({
          whyApply: res.resp_one,
          companyInterest: res.resp_two,
          gainExperience: res.resp_three,
        });
        setFormData({
          whyApply: res.resp_one,
          companyInterest: res.resp_two,
          gainExperience: res.resp_three,
        });
      }
    };

    fetchQuest();
  }, []);

  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSave = async () => {
    const requestBody = {
      user_id: user_id,
      resp_one: formData.whyApply,
      resp_two: formData.companyInterest,
      resp_three: formData.gainExperience,
    };
    console.log(requestBody);

    const res = await fetchData(
      "http://localhost:8000/maj/Quest/",
      "POST",
      requestBody
    );

    if (res.error) {
      console.error("apply failed:", res.error);
    } else {
      console.log("apply successful:", res);
      setSavedData(formData);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <form className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Why Do You Want To Apply For This Internship?
          </label>
          {isEditing ? (
            <textarea
              className="w-full mt-2 p-3 border rounded-lg min-h-[100px]"
              rows="3"
              value={formData.whyApply}
              onChange={(e) => handleChange(e, "whyApply")}
            />
          ) : (
            <div className="w-full mt-2 p-3 border rounded-lg min-h-[100px] bg-gray-50">
              {savedData.whyApply}
            </div>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            What Interests You Most About This Company?
          </label>
          {isEditing ? (
            <textarea
              className="w-full mt-2 p-3 border rounded-lg min-h-[100px]"
              rows="3"
              value={formData.companyInterest}
              onChange={(e) => handleChange(e, "companyInterest")}
            />
          ) : (
            <div className="w-full mt-2 p-3 border rounded-lg min-h-[100px] bg-gray-50">
              {savedData.companyInterest}
            </div>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            What Do You Hope To Gain From This Internship Experience?
          </label>
          {isEditing ? (
            <textarea
              className="w-full mt-2 p-3 border rounded-lg min-h-[100px]"
              rows="3"
              value={formData.gainExperience}
              onChange={(e) => handleChange(e, "gainExperience")}
            />
          ) : (
            <div className="w-full mt-2 p-3 border rounded-lg min-h-[100px] bg-gray-50">
              {savedData.gainExperience}
            </div>
          )}
        </div>

        {/* Buttons container */}
        <div className="flex justify-end gap-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-[#13043F] text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-[#13043F] text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DefaultQuestions;
