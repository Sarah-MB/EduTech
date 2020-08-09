const User = require('../models/user');
const course = require('../models/course');

//create course
exports.createcourse = (req, res, next) =>{
  const { course_name, categoryName } = req.body;
  course.findOne({ name: course_name })
  .then( result =>{
    if(result){
      return res
      .status(404).send({ status: false, message: "course already exists "})
    } else{
      const newcourse = new course({
        name: course_name,
        category:  categoryName
      })
        newcourse.save();

        Category.findOneAndUpdate( {name: categoryName}, { $push: {courses: newcourse._id }},
          { new: true, useFindAndModify: false } 
          ).then( result =>{
          return result.save();
        })
        return newcourse
      }
    }).then(newcourse =>{
      res
      .render('forms/course_form', { title: 'Create Course', course:course, 'layouts/detail'});
    console.log("Course created successful");
 

// create category
exports.createCategory = (req, res, next)=>{
  const { name } = req.body

  // if( name != 'frontend' && name != 'backend' && name != 'machine-learning'){
  //   return res
  //   .status(404).send({ message: "Name of category must be either primary, secondary or jss"})
  // }

  Category.findOne({ name })
  .then( result =>{
    if(result){
      return res
      .status(404).send({ status: false, message: "category already exists "})
    } else{
      const newCategory = new Category({
        name: name
      })
        newCategory.save();
        return newCategory
      }
    }).then( newCategory =>{
      res
      .render('forms/category_form', { title: 'Create Category', category:category, 'layouts/detail'});
      console.log("Category created successful");

//admin can update a course in a category by ID

exports.updatecourseById = (req, res, next ) =>{

  const{ courseId, course_name } = req.body


    course.findById(courseId)
    .then( result =>{
      if(!result){
        return res
        .status(404).send({ status: false, message: "course not found"});
      } else{
        course.findByIdAndUpdate(courseId, {name: course_name }).then( result =>{
          course.findById(courseId)
          .then( course =>{
            return res.status(200).send({ status: true, message: "course updated successfully",
          data: course,})
          })
        })
      }
    }).catch(err => console.log(err))
}

//admin can delete a course in a category byId

exports.deletecourseById = (req, res, next ) =>{
  
  const { courseId, categoryName } = req.body
 
  course.findById(courseId)
  .then( result => {
    if(!result){
      return res
      .status(404).send({ status: false, message: "course not found"})
    } else{
      course.findByIdAndDelete(courseId)
      .then(result =>{
    
        Category.update( categoryName, {$pull: { courses: { $gte: courseId }}})
        return res
        .status(200).json({ data: result,
        message: "course has been deleted successfully" })
      })
    }
  }).catch(err => console.log(err))

}

//admin can delete a category

exports.deleteCategory = async (req, res, next ) =>{

  try {
    const { categoryId } = req.body

  const checkCategory = await Category.findById(categoryId) 
  if(!checkCategory){
    return res
    .status(404).json({status: false, message: "category not found "})
  }
  await course.deleteMany({category: checkCategory.name })
  await Category.findByIdAndDelete(categoryId)
  
   return res.status(200).json({
            status: true,
            message: "category deleted successfully"
          })
  } catch (error) {
    console.log(error)
  }


