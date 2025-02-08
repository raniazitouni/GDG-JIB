import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext.jsx";
import { fetchData } from "../../utils/utils";
import { useNavigate } from "react-router-dom";


const InternshipForm = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const user_id = auth?.id_user;

  const [formData, setFormData] = useState({
    whyApply: "",
    interests: "",
    gain: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.whyApply.trim())
      newErrors.whyApply = "This field is required";
    if (!formData.interests.trim())
      newErrors.interests = "This field is required";
    if (!formData.gain.trim()) newErrors.gain = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("User Input:", formData);

      const requestBody = {
        user_id : user_id,
        resp_one: formData.whyApply,
        resp_two : formData.interests,
        resp_three : formData.gain
      };

      const res = await fetchData(
        "http://localhost:8000/maj/Quest/",
        "POST",
        requestBody
      );

      if (res.error) {
        console.error("apply failed:", res.error);
      } else {
        console.log("apply successful:", res);
        navigate("/internships");
      }
    }
  };

  const handlePDF = async ()=>{
    
      const res = await fetchData(
        `http://localhost:8000/profil/generate_cv/${user_id}/`,
        "POST",
        {},
        null,
        true
      );

      if (res.error) {
        console.error("generate failed:", res.error);
      } else {
        const url = window.URL.createObjectURL(new Blob([res]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `CV_${user_id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        console.log("CV downloaded successfully");
       
 
      }

  }

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
          setFormData({
            whyApply: res.resp_one,
            interests: res.resp_two,
            gain: res.resp_three,
          });
        }
      };
  
      fetchQuest();
    }, []);

  return (
    <div className="flex-1 bg-gray-50 px-8 pt-8 max-h-[calc(100vh-100px)] pb-20">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Apply for an Internship</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              id: "whyApply",
              label: "Why Do You Want To Apply For This Internship?",
            },
            {
              id: "interests",
              label: "What Interests You Most About This Company?",
            },
            {
              id: "gain",
              label:
                "What Do You Hope To Gain From This Internship Experience?",
            },
          ].map(({ id, label }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                {label} <span className="text-red-500">*</span>
              </label>
              <textarea
                id={id}
                className="w-full border border-gray-300 rounded-lg px-4 pt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={formData[id]}
                rows="3"
                value={formData[id]}
                onChange={handleChange}
              />
              {errors[id] && (
                <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
              onClick={handlePDF}
            >
              Generate a CV
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Apply Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternshipForm;
