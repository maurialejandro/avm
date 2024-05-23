<table>
    <tr>
        <td>
            <!-- Espacio para separar titulo de informacion -->
        </td>
    </tr>
    <tr >
        <td>
            <!-- Espacio para separar titulo de informacion -->
        </td>
        <th colspan="8" rowspan="1" style=" font-weight: bold; color: white; " align="center">
            Informe de Estimación de Valor
        </th>

    </tr>
    <tr >
        <td>
            <!-- Espacio para separar titulo de informacion -->
        </td>

    </tr>
    <tr>
        <td></td>
        <th colspan="8" rowspan="1" style="background-color: #132d5e; font-weight: bold; color: white; " align="center">
            Informe de la Propiedad Evaluada
        </th>
    </tr>
    <tr>
        <td>
            <!-- Espacio para separar titulo de informacion -->
        </td>
    </tr>

    <tr>
        <td></td>
        <td></td>
        <th scope="col" style="font-weight: bold; text-justify: left;" align="start">Cliente:</th>
        <th></th>
        <th></th>
        <th scope="col" style="font-weight: bold; text-justify: left;" align="start">Informe:</th>
        <th></th>
        <th scope="col" style="font-weight: bold; text-justify: left;" align="start">Fecha:</th>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td style="text-justify: left;">{{ $details['nombre_cliente'] }}</td>
        <td></td>
        <td></td>
        <td scope="row" style="text-justify: left;">N°{{ $details['informe'] }}</td>
        <td></td>
        <td style="text-justify: left;">{{ $details['fecha'] }}</td>
    </tr>
    <tr>
        <td></td>
    </tr>

    <tr>
        <td></td>
        <td></td>
        <th scope="col" style="font-weight: bold; text-justify: left;" align="start">Región/Comuna:</th>
        <th></th>
        <th></th>
        <th scope="col" style="font-weight: bold; text-justify: left;" align="start">Rol:</th>
        <th></th>
        <th scope="col" style="font-weight: bold; text-justify: left;" align="start">Tipo de Vivienda:</th>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td scope="row" style="text-justify: left;">{{ $details['region'] }}</td>
        <td></td>
        <td></td>
        <td style="text-justify: left;">{{ $details['rol'] }}</td>
        <td></td>
        <td style="text-justify: left;">{{ $details['tipo_bien'] }}</td>
    </tr>

    <tr>
        <td></td>
    </tr>

    <tr>
        <td></td>
        <td></td>
        <th scope="col" style="font-weight: bold; text-justify: left;" align="start">Sup. Construccion:</th>
        <th></th>
        <th></th>
        <th scope="col" style="font-weight: bold; text-justify: left;" align="start">Sup. Terreno:</th>
        <th></th>
        <th scope="col" style="font-weight: bold; text-justify: left;" align="start">Dirección:</th>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td style="text-justify: left;">{{ $details['sup_const'] }} m&#178;</td>
        <td></td>
        <td></td>
        <td style="text-justify: left;">{{ $details['sup_terreno'] }} m&#178;</td>
        <td></td>
    @if (strlen($details['direccion']) < 25)
        <td style="text-justify: left;">{{ $details['direccion'] }}</td>
    </tr>
    <tr>
        <td></td>
    </tr>
    @else
        @if(isset(explode(" ", $details['direccion'])[2]))
        <td style="text-justify: left;">{{ explode(" ", $details['direccion'])[0].' '.explode(" ", $details['direccion'])[1].' '.explode(" ", $details['direccion'])[2]  }}</td>
        @elseif(isset(explode(" ", $details['direccion'])[1]))
        <td style="text-justify: left;">{{ explode(" ", $details['direccion'])[0].' '.explode(" ", $details['direccion'])[1]}}</td>
        @elseif(isset(explode(" ", $details['direccion'])[0]))
        <td style="text-justify: left;">{{ explode(" ", $details['direccion'])[0]}}</td>
        @endif
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        @if(isset(explode(" ", $details['direccion'])[7]))
        <td style="text-justify: left;">{{ explode(" ", $details['direccion'])[3].' '.explode(" ", $details['direccion'])[4].' '.explode(" ", $details['direccion'])[5].' '.explode(" ", $details['direccion'])[6].' '.explode(" ", $details['direccion'])[7]}}</td>
        @elseif(isset(explode(" ", $details['direccion'])[6]))
        <td style="text-justify: left;">{{ explode(" ", $details['direccion'])[3].' '.explode(" ", $details['direccion'])[4].' '.explode(" ", $details['direccion'])[5].' '.explode(" ", $details['direccion'])[6]}}</td>
        @elseif(isset(explode(" ", $details['direccion'])[5]))
        <td style="text-justify: left;">{{ explode(" ", $details['direccion'])[3].' '.explode(" ", $details['direccion'])[4].' '.explode(" ", $details['direccion'])[5]}}</td>
        @elseif(isset(explode(" ", $details['direccion'])[4]))
        <td style="text-justify: left;">{{ explode(" ", $details['direccion'])[3].' '.explode(" ", $details['direccion'])[4]}}</td>
        @elseif(isset(explode(" ", $details['direccion'])[3]))
        <td style="text-justify: left;">{{ explode(" ", $details['direccion'])[3]}}</td>
        @endif
    </tr>
    @endif
    <!-- Mapa section -->
    <tr>
        <td></td>
        <th colspan="8" rowspan="1" style="background-color: #132d5e; color: white; font-weight: bold"
            align="center">
            Mapa ubicación propiedad
        </th>
    </tr>

    <tr>
        <td></td>
        <td></td>
        <td><img colspan="8" width="480px" style="margin-left='-20px'" align="center" src="{{ public_path('mapa.png') }}"></td>
    </tr>
    <tr>

    </tr>

    <tr>
        <td></td>
        <th colspan="8" rowspan="1" style="background-color: #132d5e; color: white; font-weight: bold"
            align="center">
            Valor Calculado
        </th>
    </tr>
    <tr>
        <td></td>
        <th colspan="3" align="center">Valor en Pesos:</th>
        <th colspan="3" align="center">Valor en UF:</th>
        <th colspan="2" align="center">Calidad (1 a 7):</th>
    </tr>
    <tr>
        <td></td>
        <td colspan="3" align="center" style="font-weight: bold; font-size: 13px;">${{ $details['valor_pesos'] }}</td>
        <td colspan="3" align="center" style="font-weight: bold; font-size: 13px;">UF {{ $details['valor_uf'] }}</td>
        <td colspan="2" align="center" style="font-weight: bold; font-size: 13px;">{{ $details['quality'] }}</td>
    </tr>
</table>