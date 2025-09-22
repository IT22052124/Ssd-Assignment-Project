import React from 'react'

const whol = () => {

    
  const [wholesale, setWholesale] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:5000/wholesalecustomer")
          .then((res) => {
            setWholesale(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);



  return (
        <div>
          <h2 className="text-lg font-semibold mb-4">Wholesale customers</h2>
          <div className="relative mb-4">
            <Select
              isSearchable
              value={val}
              primaryColor={"red"}
              onChange={handleChange}
              options={wholesale.map((wholesale) => ({
                value: wholesale._id,
                label: `${wholesale.ID} ${wholesale.name}`,
              }))}
            />
          </div>
        </div>
  )
}

export default whol;
