import React, {useState, useEffect} from 'react'
import SearchResult from './SearchResult';
import Filter from './Filter';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const[selectedCategories, setSelectedCategories] = useState([]);
    const[sortByPrice, setSortByPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([]);


    useEffect(() => {
        const fetchCourses = async () => {
        const categoriesString = selectedCategories.map(encodeURIComponent).join(',');
        let url = `/course/search?query=${encodeURIComponent(query)}`;

        if (categoriesString) {
            url += `&categories=${categoriesString}`;
        }

        if (sortByPrice) {
            url += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        try {
            const response = await axios.get(url);
            setCourses(response.data.courses);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch courses');
            setIsLoading(false);
        }
        };

    }, [query, selectedCategories, sortByPrice]);

 
    const handleFilterChange = (categories, price) => {
        setSelectedCategories(categories);
        setSortByPrice(price);
    }

    const isEmpty = !isLoading && courses.length === 0;

  return (
    <div className='max-w-7xl mx-auto p-4 md:p-8 mt-5'>
        <div className='my-6'>
            <h1 className='font-bold text-xl md:text-2xl'>Results for "{query}" </h1>
            <p>Showing results for {" "}
                <span className='font-bold text-blue-800 italic'>{query}</span>
            </p>
        </div>
        <div className='flex flex-col md:flex-row gap-10'>
            <Filter handleFilterChange={handleFilterChange}/>
            <div className='flex-1'>
                { isLoading ? (
                Array.from({length:3}).map((_, idx) => (
                    <CourseSkeleton key={idx}/>
                ))
            ) : isEmpty ? (<CourseNotFound/>) : (
                courses.map((course) => (
                    <SearchResult key={course._id} course={course}/>
                ))
            )
            }
            </div>
        </div>
    </div>
  )
}

export default SearchPage

const CourseSkeleton = () => {
    return (
        <p>Loading</p>
    )
}

const CourseNotFound = () => {
    return (
        <p>Course Not Found.</p>
    )
}