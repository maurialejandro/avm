<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Tasación Express (AVM)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="margin: 0; padding: 0;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 1px 0 0 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
                    style="border: 1px solid #cccccc; border-collapse: collapse;">
                    <tr>
                        <td align="left" valign="top" bgcolor="#ffffff"
                            style="padding: 40px 30px 30px 30px; color: #153643">
                            <img src="https://valuaciones.cl/wp-content/uploads/2022/04/logo.png" alt="Valuaciones Logo"
                                width="30%" style="display: block;" />
                            <p>
                                Valuaciones de Chile S.P.A
                                <br />
                                96.948.100-6
                                <br />
                                Monjitas 392, Of. 1001, Santiago, Santiago, RM.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="padding: 20px 0 15px 0; color: #0e242c; font-family: Lato, Arial, sans-serif; font-size: 16px; line-height: 20px;"
                                        align="justify">
                                        <h3>{{ $details['title'] }}</h3><br />
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <table border="0" cellpadding="5" cellspacing="0" width="100%"
                                            style=" padding: 10px 10px 10px 10px; color: #153643; font-family: Lato, Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                            <thead>
                                                <tr>
                                                    <th colspan="2" style="background-color: #163671; color: white">
                                                        <b>Datos de acceso para el sistema de AVM</b>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style="background-color: #f2f2f2;">
                                                    <td width="35%" valign="top" align="right"
                                                        style="border-right: solid 1px #163671">
                                                        Correo de acceso:
                                                    </td>
                                                    <td width="65%" valign="top" align="center">
                                                        {{ $details['mail'] }}
                                                    </td>
                                                </tr>
                                                <tr style="background-color: #cecbcb;">
                                                    <td width="35%" valign="top" align="right"
                                                        style="border-right: solid 1px #163671">
                                                        Código de acceso:
                                                    </td>
                                                    <td width="65%" valign="top" align="center">
                                                        {{ $details['code'] }}
                                                    </td>
                                                </tr>
                                                <tr style="background-color: #f2f2f2;">
                                                    <td width="35%" valign="top" align="right"
                                                        style="border-right: solid 1px #163671">
                                                        Enlace:
                                                    </td>
                                                    <td width="65%" valign="top" align="center">
                                                        <a
                                                            href={{ env('APPBACKENDURL') }}>https://avm.valuaciones.cl/</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <table border="0" cellpadding="5" cellspacing="0" width="100%"
                                            style=" padding: 10px 10px 10px 10px; color: #153643; font-family: Lato, Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                            <thead>
                                                <tr>
                                                    <th colspan="2" style="background-color: #163671; color: white">
                                                        <b>Información de la valoración</b>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style="background-color: #f2f2f2;">
                                                    <td width="35%" valign="top" align="right"
                                                        style="border-right: solid 1px #163671">
                                                        Calidad valoración:
                                                    </td>
                                                    <td width="65%" valign="top" align="center">
                                                        {{ $details['nota'] }}/7.0
                                                    </td>
                                                </tr>
                                                <tr style="background-color: #cecbcb;">
                                                    <td width="35%" valign="top" align="right"
                                                        style="border-right: solid 1px #163671">
                                                        Valoración en UF / Valoración en pesos:
                                                    </td>
                                                    <td width="65%" valign="top" align="center">
                                                        UF {{ $details['valor'] }}
                                                    </td>
                                                </tr>
                                                <tr style="background-color: #f2f2f2;">
                                                    <td width="35%" valign="top" align="right"
                                                        style="border-right: solid 1px #163671">
                                                        Dirección:
                                                    </td>
                                                    <td width="65%" valign="top" align="center">
                                                        {{ $details['address'] }}
                                                    </td>
                                                </tr>
                                                <tr style="background-color: #cecbcb;">
                                                    <td width="35%" valign="top" align="right"
                                                        style="border-right: solid 1px #163671">
                                                        Rol:
                                                    </td>
                                                    <td width="65%" valign="top" align="center">
                                                        {{ $details['rol'] }}
                                                    </td>
                                                </tr>
                                                <tr style="background-color: #f2f2f2;">
                                                    <td width="35%" valign="top" align="right"
                                                        style="border-right: solid 1px #163671">
                                                        Región / Comuna:
                                                    </td>
                                                    <td width="65%" valign="top" align="center">
                                                        {{ $details['region'] }}
                                                    </td>
                                                </tr>
                                                <tr style="background-color: #cecbcb;">
                                                    <td width="35%" valign="top" align="right"
                                                        style="border-right: solid 1px #163671">
                                                        Tipo de bien:
                                                    </td>
                                                    <td width="65%" valign="top" align="center">
                                                        {{ $details['bien'] }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>

                    </tr>

                    <tr>
                        <td bgcolor="#2e2e2e" style="padding: 30px 30px 30px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="color: #dddddd; font-family: Roboto Slab, Arial, sans-serif; font-size: 11px;"
                                        width="100%">
                                        En caso de necesitar ayuda contactar al departamento TI de Valuaciones <a
                                            href="mailto:ayuda@valuaciones.cl"
                                            style="color: white">ayuda@valuaciones.cl</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
