import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteVideo, uploadMedia } from "../utils/cloudinary.js";

export const createcourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category are required.",
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      course,
      message: "Course created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to created course",
    });
  }
};
export const getcourse = async (req, res) => {
  try {
    const courses = await Course.find({}).populate("creator");
    return res.json(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};

export const getspecificcourse = async (req, res) => {
  try {
    const newcourse = await Course.findById(req.params.id)
      .populate("creator")
      .populate("lectures");
    return res.json(newcourse);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};

export const getcoursebyid = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    return res.json(course);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch course",
    });
  }
};
export const updatecourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMedia(publicId);
      }

      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      course,
      message: "Course updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

export const deletecourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    return res.json({
      course,
      message: "Course deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to delete course",
    });
  }
};

export const searchCourse = async (req, res) => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;
    console.log(req.query);

    const searchCriteria = {
      isPublished: false,
    };

    if (query) {
      searchCriteria.$or = [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ];
    }

    if (categories) {
      const categoriesArray = categories.split(",");
      searchCriteria.category = { $in: categoriesArray };
    }

    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1;
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1;
    }

    let courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      courses: courses || [],
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle, courseId } = req.body;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture title is required",
      });
    }

    const lecture = await Lecture.create({
      lectureTitle,
    });

    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({
      lecture,
      message: "Lecture created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to add lecture",
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lecture",
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;
    console.log("CourseID:", courseId, "LectureId: ", lectureId, isPreviewFree);

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    const course = await Course.findById(courseId);
    if (course && course.lectures.includes(lecture._id)) {
      await course.save();
    }
    return res.status(200).json({
      lecture,
      message: "Lecture updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to edit lecture",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }

    if (lecture.publicId) {
      await deleteVideo(lecture.publicId);
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({
      message: "Lecture removed successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lecture",
    });
  }
};

export const getLecturebyId = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lecture",
    });
  }
};

// export const togglePublishCourse = async(req,res)=>{
//     try {
//         const {courseId} = req.params;
//         const {publish}=req.query;
//         const course = await Course.findById(courseId);
//         if(!course){
//             return res.status(404).json({
//                 message:"Course not found"
//             });

//         }
//         course.isPublished = publish==="true"?true:false;
//         await course.save();
//         const statusMessage=course.isPublished?"published":"unpublished";
//         return res.status(200).json({
//             message:`Course is ${statusMessage}`
//         });
//     } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 message:"Failed to Update Status"
//             })

//     }
// }
