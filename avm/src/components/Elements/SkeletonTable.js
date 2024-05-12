import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Box, Skeleton} from "@mui/material";
import Table from "@mui/material/Table";

export const SkeletonTable = ({ colSpan, limit }) => {

    return(
        <>
            { new Array(limit).fill(0).map((x,i) => (
                <Skeleton key={i} >
                    <Box key={i} display="flex" sx={{ margin: "5px", flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
                        <TableRow  key={i}>
                            <TableCell style={{ width: 1200 }} cols={colSpan}>
                            </TableCell>
                        </TableRow>
                    </Box>
                </Skeleton>
            ))}
        </>
    )
}