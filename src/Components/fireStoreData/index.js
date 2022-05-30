import React, { useEffect } from "react";
import { firestoreDb } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import MaterialTable from "material-table";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import "./store.css";
import Loader from "react-loader-spinner";

const FirestoreData = (props) => {
  const [database, setDataBase] = useState([]);
  //const [openData, setOpenDatabase] = useState("");
  const [dataType, setDataType] = useState("");
  const [clickType, setClickType] = useState("");
  const [rows, setRows] = React.useState(database);
  const [state, setState] = useState({
    title: "",
    author: "",
    genre: "",
    count: "",
    country: "",
    organization: "",
    capital: "",
    loader: false,
  });

  const {
    title,
    author,
    genre,
    count,
    country,
    organization,
    capital,
    loader,
  } = state;

  const loginRef = collection(firestoreDb, "firebaseBooksData");
  const navigate = useNavigate();
  console.log(database, "firebase data");
  console.log(rows, "rows");
  console.log(title, author, genre, count, "book data");
  console.log(country, capital, organization, "country data");
  console.log(loginRef, "firebase book data");
  //console.log(openData, "open database");
  console.log(dataType, "data type in comp");
  console.log(clickType, "clicktype");

  useEffect(() => {
    setRows(database);
    setClickType(props.clickType);
    setDataType(props.type);
    const detailsObject = {
      title: title,
      author: author,
      genre: genre,
      count: count,
      country: country,
      organization: organization,
      capital: capital,
    };
    if (
      (title !== "" && author !== "" && count !== "" && genre !== "") ||
      (capital !== "" && country !== "" && organization !== "")
    ) {
      localStorage.setItem("detailsObject", JSON.stringify(detailsObject));
      navigate("/detailsScreen");
    }
  }, [
    database,
    title,
    author,
    genre,
    count,
    country,
    capital,
    organization,
    props.type,
  ]);

  useEffect(() => {
    if (clickType === "firebase") {
      setState({ ...state, loader: true });
      console.log("firebase api called");
      getDocs(loginRef).then((snapshot) => {
        console.log(snapshot.docs, "docs res");
        let data = [];
        snapshot.docs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setDataBase(data);
        setState({ ...state, loader: false });
        //setOpenDatabase("");
      });
    }

    if (clickType === "open") {
      console.log("open api called");
      setState({ ...state, loader: true });
      axios
        .get("https://countriesnow.space/api/v0.1/countries/capital")
        .then((response) => {
          setState({ ...state, loader: false });
          setDataBase(response.data.data.splice(0, 15), "145data");
          //setOpenDatabase(response.data.data.splice(0, 15), "145data");
          //setDataBase("");
        });
    }
  }, [clickType, dataType]);

  const columns = [
    {
      title: "Title",
      field: "Title",
      render: (row) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setState({
              ...state,
              title: row.Title,
              author: row.Author,
              genre: row.Genre,
              count: row.salesCount,
            });
          }}
        >
          {row.Title}
        </div>
      ),
    },
    {
      title: "Author",
      field: "Author",
    },
    {
      title: "Genre",
      field: "Genre",
    },
    {
      title: "Sales Count",
      field: "salesCount",
    },
  ];

  const columnsOpen = [
    {
      title: "Country",
      field: "name",
      render: (row) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setState({
              ...state,
              country: row.name,
              capital: row.capital,
              organization: row.iso3,
            });
          }}
        >
          {row.name}
        </div>
      ),
    },
    { title: "Capital", field: "capital" },
    { title: "Organization", field: "iso3" },
  ];
  console.log(columns, "columns");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "5%",
        margin: "3%",
      }}
    >
      {clickType !== "" && loader === false ? (
        <MaterialTable
          columns={clickType === "firebase" ? columns : columnsOpen}
          //data={clickType === "firebase" ? database : openData}
          data={database}
          title={clickType === "firebase" ? "FAMOUS BOOKS" : "CONTRIES DATA"}
          style={{ fontFamily: "Inter", color: "#868B90", fontSize: "18px" }}
          options={{
            paging: true,
            pageSize: 5,
            emptyRowsWhenPaging: false,
            pageSizeOptions: [5, 10, 15],
            headerStyle: {
              position: "sticky",
              backgroundColor: "#01579b",
              fontFamily: "Inter",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "bold",
            },
            maxBodyHeight: 500,
          }}
        />
      ) : (
        <div className="loader-cont">
          {clickType !== "" && loader === true && (
            <Loader
              type="TailSpin"
              color="#fc031c"
              height={50}
              width={60}
              visible={true}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default FirestoreData;

// <div
//   style={{
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     flexWrap: "wrap",
//     width: "100%",
//   }}
// >
//   {/* <MaterialTable columns={columns} /> */}
//   {/* <DataGrid
//     sx={{
//       "& .MuiDataGrid-cell:hover": {
//         color: "primary.main",
//         overflow: "visible",
//         width: "100%",
//       },
//       // "&scrollbar-hidden::-webkit-scrollbar": {
//       //   display: "none",
//       // },
//     }}
//     rows={rows}
//     columns={columns}
//     // style={{ cursor: "pointer" }}
//     // autoPageSize={true}
//     pageSize={25}
//     rowHeight={65}
//     // rowsPerPageOptions={[5,10,15,30,45]}
//     // paging={true}
//     // make initial page size
//     // emptyRowsWhenPaging= {false}

//     //onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//     rowsPerPageOptions={[5, 10, 15, 20, 25]}
//     pagination
//     disableSelectionOnClick={true}

//     // onCellClick={}
//     // onCellClick={(params) => {
//     //   naviagetToProjectDetails(params.value, params.id);
//     // }}
//   /> */}
//   {dataType === "firebase"
//     ? database.map((data) => {
//         return (
//           <div
//             style={{
//               backgroundColor: "#7bc2e0",
//               margin: "10px",
//               padding: "10px",
//               borderStyle: "solid",
//               borderWidth: "1px",
//               borderColor: "#1e98ba",
//               borderRadius: "10px",
//               width: "200px",
//             }}
//           >
//             <h1 className="head-data">{data.Title}</h1>
//             <p className="para-data">{data.Author}</p>
//             <p className="para-data">{data.Genre}</p>
//             <p className="para-data">{data.salesCount}</p>
//           </div>
//         );
//       })
//     : null}
//   {dataType === "open"
//     ? openData.map((data) => {
//         return (
//           <div
//             style={{
//               backgroundColor: "#bdde16",
//               margin: "10px",
//               padding: "10px",
//               borderStyle: "solid",
//               borderWidth: "1px",
//               borderColor: "#1e98ba",
//               borderRadius: "10px",
//               width: "200px",
//             }}
//           >
//             <h1 className="head-data">{data.name}</h1>
//             <p className="para-data">{data.capital}</p>
//             <p className="para-data">{data.iso3}</p>
//           </div>
//         );
//       })
//     : null}
// </div>
