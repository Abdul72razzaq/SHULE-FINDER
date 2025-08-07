import School from '../models/schools.js'; // Assuming you have a School model defined

//  Get all schools
export async function getAllSchools(req, res) {
  try {
    const schools = await School.find(); // Fetch all schools from the database
    res.status(200).json(schools); // Return the list of schools
  } catch (error) {
    res.status(500).json({ message: "Error fetching schools", error: error.message });
  }
}

// 🏗 Create a new school
export async function createSchool(req, res) {
  const { name, category, location, address, phone, email, website, shortDescription, longDescription } = req.body;

  const newSchool = new School({
    name,
    category,
    location,
    address,
    phone,
    email,
    website,
    shortDescription,
    longDescription,
  });

  try {
    const savedSchool = await newSchool.save(); // Save the new school to the database
    res.status(201).json({ message: "School created successfully", school: savedSchool });
  } catch (error) {
    res.status(400).json({ message: "Error creating school", error: error.message });
  }
}

// 🛠 Update school data
export async function updateSchool(req, res) {
  const { id } = req.params; // Get the school ID from the request parameters
  const updates = req.body; // Get the updates from the request body

  try {
    const updatedSchool = await School.findByIdAndUpdate(id, updates, { new: true }); // Update the school
    if (!updatedSchool) {
      return res.status(404).json({ message: "School not found" });
    }
    res.status(200).json({ message: "School updated successfully", school: updatedSchool });
  } catch (error) {
    res.status(400).json({ message: "Error updating school", error: error.message });
  }
}

// 🗑 Delete a school
export async function deleteSchool(req, res) {
  const { id } = req.params; // Get the school ID from the request parameters

  try {
    const deletedSchool = await School.findByIdAndDelete(id); // Delete the school
    if (!deletedSchool) {
      return res.status(404).json({ message: "School not found" });
    }
    res.status(204).json({ message: "School deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting school", error: error.message });
  }
}

