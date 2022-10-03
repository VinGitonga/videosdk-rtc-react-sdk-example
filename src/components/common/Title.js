const Title = ({ title, dark }) => {
    return <h2 style={{ color: dark ? "#3E84F6" : "#fff" }}>{title}</h2>;
};


export default Title