import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext.jsx";
import { fetchData } from "../../utils/utils";

const SkillsAndExperience = () => {
  const { auth } = useContext(AuthContext);
  const user_id = auth?.id_user;

  const [isEditing, setIsEditing] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);

  const [skills, setSkills] = useState([]);
  const [savedSkills, setSavedSkills] = useState([]);

  const [experiences, setExperiences] = useState([]);

  const [savedExperiences, setSavedExperiences] = useState([]);

  useEffect(() => {
    const fetchQuest = async () => {
      const res = await fetchData(
        `http://localhost:8000/profil/data/${user_id}/`,
        "GET"
      );

      console.log(res);

      if (res.error) {
        console.error("error:", res.error);
      } else {
        const skillsArray = res.skills.split(",").map((skill) => skill.trim()); // Trim to remove extra spaces
        setSkills(skillsArray);
        setSavedSkills(skillsArray);
        setExperiences(
          res.experiences.map((item) => {
            return {
              title: item.role,
              company: item.description,
              years: `from ${item.date_debut} to ${item.date_fin}`,
            };
          })
        );
        setSavedExperiences(
          res.experiences.map((item) => {
            return {
              title: item.role,
              company: item.description,
              years: `from ${item.date_debut} to ${item.date_fin}`,
            };
          })
        );
      }
    };

    fetchQuest();
  }, []);

  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    years: "",
  });

  const handleAddSkill = async (newSkill) => {
    const requestBody = {
      user_id: user_id,
      skill: newSkill,
    };

    const res = await fetchData(
      "http://localhost:8000/maj/skills/",
      "POST",
      requestBody
    );
    if (res.error) {
      console.error("add failed:", res.error);
    } else {
      console.log("add successful:", res);
      setSkills([...skills, newSkill]);
      setShowSkillModal(false);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  const handleAddExperience = async () => {
    if (newExperience.title && newExperience.company && newExperience.years) {
      const requestBody = {
        user_id: user_id,
        description: newExperience.company,
        date: newExperience.years,
        role: newExperience.title,
      };

      const res = await fetchData(
        "http://localhost:8000/maj/Expert/",
        "POST",
        requestBody
      );

      if (res.error) {
        console.error("add failed:", res.error);
      } else {
        console.log("add successful:", res);
        setExperiences([...experiences, newExperience]);
        setShowExperienceModal(false);
        setNewExperience({ title: "", company: "", years: "" });
      }
    }
  };

  const handleRemoveExperience = (indexToRemove) => {
    setExperiences(experiences.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async () => {
    setSavedSkills(skills);
    setSavedExperiences(experiences);
    setIsEditing(false);
  };

  return (
    <div>
      {/* Skills Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Skills</h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {isEditing ? (
          <>
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 rounded-lg"
              >
                <span className="px-4 py-2 text-blue-600">{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="px-2 py-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              className="bg-[#13043F] text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              onClick={() => setShowSkillModal(true)}
            >
              Add Skill
            </button>
          </>
        ) : (
          savedSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
            >
              {skill}
            </span>
          ))
        )}
      </div>

      {/* Experience Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Experience</h2>

        <div className="space-y-4">
          {(isEditing ? experiences : savedExperiences).map(
            (experience, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-lg">{experience.title}</h3>
                  <p className="text-gray-600">{experience.company}</p>
                  <p className="text-gray-500 text-sm">{experience.years}</p>
                </div>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveExperience(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            )
          )}
        </div>

        {isEditing && (
          <div className="mt-4">
            <button
              className="bg-[#13043F] text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              onClick={() => setShowExperienceModal(true)}
            >
              Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Bottom buttons */}
      <div className="flex justify-end gap-4 mt-8">
        {isEditing ? (
          <>
            {/* <button
              type="button"
              onClick={() => {
                setSkills(savedSkills);
                setExperiences(savedExperiences);
                setIsEditing(false);
              }}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button> */}
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#13043F] text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              End editing
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

      {/* Add Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium mb-4">Add New Skill</h3>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4"
              placeholder="Enter skill name"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowSkillModal(false);
                  setNewSkill("");
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newSkill.trim()) {
                    handleAddSkill(newSkill.trim());
                  }
                }}
                className="bg-[#13043F] text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Experience Modal */}
      {showExperienceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium mb-4">Add New Experience</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newExperience.title}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g. Frontend Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domaine
                </label>
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      company: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g. Dev"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years
                </label>
                <input
                  type="text"
                  value={newExperience.years}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      years: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g. 2020-Present"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowExperienceModal(false);
                  setNewExperience({ title: "", company: "", years: "" });
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExperience}
                className="bg-[#13043F] text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsAndExperience;
