import data from "../../data/mock/2021Fall-2024Fall.json"

const jsonData: GenericJsonData = data;

const getCourseDetails = (targetCode: string): Course | null => {
    const courses = jsonData.results;
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
