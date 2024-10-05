import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Pagination from '@mui/material/Pagination';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: (props) => (props.expand ? "rotate(180deg)" : "rotate(0deg)"),
}));

function Blogs() {
  const [expanded, setExpanded] = useState({});
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/blogs/get-all-blogs"
      );
      setData(response.data.blogs);
      console.log(response, "kkk");
    } catch (error) {
      console.error(error);
    }
  };


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // This will format the date to "dd-MM-yyyy"
};

  const handleExpandClick = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice data to get items for the current page
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className="flex flex-wrap mx-16 justify-center">
        {currentData.map((item, index) => {
          const isExpanded = !!expanded[item._id];
          const fullName = `${item?.userInfo?.userFname} ${item?.userInfo?.userLname}`;
          return (
            <div key={index} className="m-5">
              <Card sx={{ width: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar src={item?.userInfo?.profile} >
                      {item.userInfo.userFname[0]} {/* Fallback to the first letter of the user's name */}
                    </Avatar>
                  }
                  
                  title={fullName}
                  subheader={formatDate(item.date)}
                />
                <Link to={`/blogs/${item._id}`} state={item} >
                <CardMedia
                  sx={{maxHeight: 200}}
                  component="img"
                  height="194"
                  image={item.image}
                  alt="Loading..."
                />
                </Link>
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <div className="text-xs sm:text-base break-words" dangerouslySetInnerHTML={{ __html: item?.name }} />
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={isExpanded}
                    onClick={() => handleExpandClick(item._id)}
                    aria-expanded={isExpanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography sx={{ marginBottom: 2 }}>
                      <ReactMarkdown className="break-words">
                        {item.description}
                      </ReactMarkdown>
                    </Typography>
                    <Typography>{item.categoriesInfo.name}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          );
        })}
      </div>
      {/* <div className="flex justify-center">
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
      </div> */}
      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          // color="standard"
          // color="primary"
        />
      </div>
    </>
  );
}

export default Blogs;
