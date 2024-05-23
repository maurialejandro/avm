import React, {useEffect} from 'react';
import {styled, useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import PropTypes from "prop-types";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {getClients} from "../../services/client";
import '../../App.css';
import '../../components/styles/FormStyles.css';
import {SkeletonTable} from "../Elements/SkeletonTable";
import {enqueueSnackbar} from "notistack";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAuthContext} from "../../context/AuthContext";

export function TableClients(props) {
    const { open, setOpen, openDelete, setOpenDelete, userClient, setUserClient, rows, setRows, refresh, setRefresh } = props;
    const [ isLoading, setIsLoading ] = React.useState(true);
    
    const user = useAuthContext();

    useEffect(() => {
        (async () => {
            setTimeout(async () => {
                await getClientsBack();
            }, 3000)
        })()
    }, [refresh]);

    const getClientsBack = async () => {
        setIsLoading(true)
        const res = await getClients();

        if(res.code === "ERR_BAD_RESPONSE"){
            enqueueSnackbar('Error en el servidor... Contactarse con el equipo TI', {
                variant: "error",
            });
            setIsLoading(false);
            return;
        }
        if(res.code === 'ERR_BAD_REQUEST'){
            enqueueSnackbar('Error en el servidor... Contactece con el equipo TI.', {
                variant: 'error',
            })
            return;
        }
        if(res.code === "ERR_NETWORK"){
            enqueueSnackbar('Error de conexión con el servidor', {
                variant: "error"
            });
            setIsLoading(false);
            return;
        }
        if(res.clients.length === 0){
            enqueueSnackbar('No se encontraron datos', {
                variant: "warning"
            });
            setIsLoading(false);
            return;
        }
        if(res.success === true){
            setRows(res.clients);
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
    const handleOpenCloseModal = (client) => {
        setUserClient(client)
        setOpen(!open);
    }
    const handleOpenCloseModalDelete = (client) => {
        setUserClient(client);
        setOpenDelete(!openDelete)
    }
    return(
        <>
            { isLoading ? (
                <Paper style={{backgroundColor: 'transparent', borderRadius: 16, padding: 10}} >
                    <SkeletonTable colSpan={5} limit={5} />
                </Paper>
            ) : (
                <Paper sx={{ width: '100%' }} style={{ backgroundColor: 'transparent', borderRadius: 16  }} >
                    <TableContainer component={Paper} style={{ borderRadius: 16 }} >
                        <Table sx={{ minWidth: 700 }}  className="glass-table" aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontSize: 15 }} align="right">Rut Cliente</StyledTableCell>
                                    <StyledTableCell style={{ fontSize: 15 }} align="right">Nombre Cliente</StyledTableCell>
                                    <StyledTableCell style={{ fontSize: 15 }} align="right">Teléfono Cliente</StyledTableCell>
                                    <StyledTableCell style={{ fontSize: 15 }} align="right">Correo Cliente</StyledTableCell>
                                    <StyledTableCell style={{ fontSize: 15 }} align="right">Acción</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                ).map((row, index) => (

                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="right" style={{ backgroundColor: '#f1f1f1', color: '#2f2f2f', borderColor: '#8d8d8d' }} >{row.id}</StyledTableCell>
                                        <StyledTableCell align="right" style={{ backgroundColor: '#f1f1f1', color: '#2f2f2f', borderColor: '#8d8d8d' }} >{row.name}</StyledTableCell>
                                        <StyledTableCell align="right" style={{ backgroundColor: '#f1f1f1', color: '#2f2f2f', borderColor: '#8d8d8d' }} >9 67765559</StyledTableCell>
                                        <StyledTableCell align="right" style={{ backgroundColor: '#f1f1f1', color: '#2f2f2f', borderColor: '#8d8d8d' }} >{row.email}</StyledTableCell>
                                        <StyledTableCell align="right" style={{ backgroundColor: '#f1f1f1', color: '#2f2f2f', borderColor: '#8d8d8d' }} >

                                            <button
                                                disabled={user.user.type === 'administrator_supervisor' ? true : false}
                                                onClick={ () => { handleOpenCloseModal(row) } }
                                                className="btn-icon"
                                            >
                                                <EditIcon fontSize="medium"   />
                                            </button>
                                            <button
                                                disabled={user.user.type === 'administrator_supervisor' ? true : false}
                                                onClick={ () => { handleOpenCloseModalDelete(row) } }
                                                className="btn-icon"
                                            >
                                                <DeleteIcon fontSize="medium" />
                                            </button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        style={{ marginTop: '10px' }}
                        rowsPerPageOptions={[5,10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            ) }
        </>
    );
}