import data from '../../data/complete_catalog_Fall2021-Fall2024.json';

const jsonData: GenericJsonData = data;

const getCourseDetails = (targetCode: string): Course | null => {
    const courses = jsonData.courses;
    let left = 0;
    let right = courses.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midCourse = courses[mid];
        const midCode = midCourse.code;

        if (midCode === targetCode) {
            return midCourse;
        } else if (midCode < targetCode) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return null;
};

export default getCourseDetails;
