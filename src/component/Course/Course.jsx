import { useLocation } from 'react-router-dom'

function Course() {
    const location = useLocation();
    const search_value = location.state.value;
    return (
        <>
            <div>{search_value}</div>
        </>
    )
}

export default Course;