import React from 'react';
import '../../components/styles/FormStyles.css';

export function Footer(){

    return (
        <footer className="bg-body-tertiary text-center text-lg-start"
            style={{ marginBottom: "100px" }}
        >
             <hr style={{backgroundColor: '#bcbbbb'}}/>
            <br />
            © 2024 Valuaciones de Chile. Todos los Derechos Reservados
        </footer>
    )
}