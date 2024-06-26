interface CourseNode {
    courseCode: string;
    children?: CourseNode[];
}

const getPrerequisites = (code: string, restrict_info: string): CourseNode => {
    const root: CourseNode = { courseCode: code };
    root.children = [];
  
    if (restrict_info === "Varies by section") {
      const variesNode: CourseNode = { courseCode: "Varies by section" };
      root.children.push(variesNode);
      return root;
    }
  
    const coursePattern = /[A-Z]{4} \d{4}/g;
    const andParts = restrict_info.split(/\band\b/i);
  
    for (const andPart of andParts) {
      const orParts = andPart.split(/\bor\b/i);
      const orGroup: CourseNode = { courseCode: "One of the following" };
      orGroup.children = [];
  
      for (const orPart of orParts) {
        const courses = orPart.match(coursePattern);
  
        if (courses) {
          courses.forEach(course => {
            const courseNode: CourseNode = { courseCode: course.trim() };
            orGroup.children!.push(courseNode);
          });
        }
      }
  
      if (orGroup.children.length > 0) {
        root.children.push(orGroup);
      }
    }
  
    return root;
};

export default getPrerequisites  
