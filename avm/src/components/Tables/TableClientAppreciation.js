import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DownloadIcon from '@mui/icons-material/Download';
import { styled } from '@mui/material/styles';
import {SkeletonTable} from "../Elements/SkeletonTable";
import {useAuthContext} from "../../context/AuthContext";
import {getAppreciationByClient} from "../../services/appreciation";
import {enqueueSnackbar} from "notistack";
const apiUrl = process.env.REACT_APP_API_URL;

export function TableClientAppreciation(){
    const [isLoading, setIsLoading] = React.useState(true);
    const [ rows, setRows ] = React.useState([]);
    const user = useAuthContext();

    React.useEffect(() => {
        (async () => {
            setTimeout(() => {
                getAppreciationBack();
            }, 3000)
        })()
    }, []);
    const getAppreciationBack = async () => {
        // add validations
        const res = await getAppreciationByClient();
        console.log(res, 'CLIETN APPRECIATION');
        if(res.code === "ERR_BAD_RESPONSE"){
            console.log("PASO")
            enqueueSnackbar('Error en el servidor... Contactarse con el equipo TI', {
                variant: "error",
            });
            setIsLoading(false)
            return;
        }
        if(res.code === 'ERR_BAD_REQUEST'){
            enqueueSnackbar('Error en el servidor... Contactece con el equipo TI.', {
                variant: 'error',
            })
            setIsLoading(false)
            return;
        }
        if(res.code === "ERR_NETWORK"){
            enqueueSnackbar('Error de conexión con el servidor', {
                variant: "error"
            });
            setIsLoading(false)
            return;
        }
        if(res?.appreciations.length === 0){
            enqueueSnackbar('No se encontraron datos', {
                variant: "warning"
            });
            setIsLoading(false);
        }
        if(res?.appreciations.length > 0){
            setRows(res.appreciations);
        }
        setIsLoading(false);
    }
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            color: theme.palette.common.white,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 1,
        },
    }));
    function TablePaginationActions(props) {
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </Box>
        );
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return(
        <>
            {isLoading ? (
                <Paper style={{backgroundColor: 'transparent', borderRadius: 16, padding: 10,}}>
                    <SkeletonTable colSpan={5} limit={5}/>
                </Paper>
            ) : (
                <Paper sx={{width: '100%' }} style={{ backgroundColor: 'transparent', borderRadius: 16  }}>
                    <TableContainer component={Paper} style={{ borderRadius: 16  }}>
                        <Table sx={{ minWidth: 700 }}  className="glass-table" aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontSize: 15 }} align="right">Tipo de bien</StyledTableCell>
                                    <StyledTableCell style={{ fontSize: 15 }} align="right">Direccion</StyledTableCell>
                                    <StyledTableCell style={{ fontSize: 15 }} align="right">Rol</StyledTableCell>
                                    <StyledTableCell style={{ fontSize: 15 }} align="right">Valoracion Uf</StyledTableCell>
                                    <StyledTableCell style={{ fontSize: 15 }} align="right">valoracion en pesos</StyledTableCell>
                                    <StyledTableCell style={{ fontSize: 15 }} align="right">Calidad valoracion</StyledTableCell>
                                    <StyledTableCell style={{ fontSize: 15 }} align="right">Accion</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                ).map((row, index) => (
                                    // Add styles to css file
                                    // Generate 1 file for section
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="right" style={{ backgroundColor: '#f1f1f1', color: '#2f2f2f', borderColor: '#8d8d8d' }} >{row.id_type_of_assets}</StyledTableCell>
                                        <StyledTableCell align="right" style={{ backgroundColor: '#f1f1f1', color: '#2f2f2f', borderColor: '#8d8d8d' }} >{row.address}</StyledTableCell>
                                        <StyledTableCell align="right" style={{ backgroundColor: '#f1f1f1', color: '#2f2f2f', borderColor: '#8d8d8d' }} >{row.rol}</StyledTableCell>
                                        <StyledTableCell align="right" style={{ backgroundColor: '#f1f1f1', color: '#2f2f2f', borderColor: '#8d8d8d' }} >{row.value_uf_reference}</StyledTableCell>
                                        <StyledTableCell align="right" style={{ backgroundColor: '#f1f1f1', color: '#2f2f2f', borderColor: '#8d8d8d' }} >{row.pesos}</StyledTableCell>
                                        <StyledTableCell align="right" style={{ backgroundColor: '#f1f1f1', color: '#2f2f2f', borderColor: '#8d8d8d' }} >{row.quantity}</StyledTableCell>
                                        <StyledTableCell align="right" style={{ backgroundColor: '#f1f1f1', color: '#2f2f2f', borderColor: '#8d8d8d' }} >
                                        <button
                                            className="btn-icon"
                                        >
                                            { (row.file?.length > 1) && (
                                                <a href={`${apiUrl}/file/${row.file[1].path}`} download>
                                                    <DownloadIcon />
                                                </a>
                                            ) }
                                            
                                        </button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        style={{ marginTop: '10px' }}
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
        </>

    )
}
