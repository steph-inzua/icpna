<?php
function cleardata($data) { return htmlspecialchars(stripslashes(trim($data))); }
if(isset($_POST['tipo']) && $_POST['tipo']!='')
{
    $cnx = new mysqli('localhost', 'icpna', '874oRRQRtmN#','icpna');
    $cnx->set_charset("utf8");
    $fecha = date("Y-m-d H:i:s",strtotime("-5 hour"));

    switch ($_POST['tipo']) {

        case 'registro':
            $nombres = cleardata($_POST['nombres']);
            $apellidos = cleardata($_POST['apellidos']);
            $tipodocumento = cleardata($_POST['tipodocumento']);
            $numerodocumento = cleardata($_POST['numerodocumento']);
            $celular = cleardata($_POST['celular']);
            $correo = cleardata($_POST['correo']);
            $sedes = cleardata($_POST['sedes']);
            $programa = cleardata($_POST['programa']);
            $formulario = cleardata($_POST['formulario']);

            $utm_source = cleardata($_POST['utm_source']);
            $utm_medium = cleardata($_POST['utm_medium']);
            $utm_campaign = cleardata($_POST['utm_campaign']);
            $utm_term = cleardata($_POST['utm_term']);
            $utm_content = cleardata($_POST['utm_content']);
            $gclid = cleardata($_POST['gclid']);

            $sql = sprintf('SELECT * FROM registros WHERE numerodocumento="%s"', $numerodocumento);
            $r = $cnx->query($sql);
            if($r->num_rows>0) {
                echo json_encode(array('rpta' => 'ok' ));
            } else {

                $sql = sprintf('INSERT INTO registros (nombres, apellidos, tipodocumento, numerodocumento, celular, correo, sedes, programa, formulario, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fecha) VALUES ("%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s")',
                                $nombres, $apellidos, $tipodocumento, $numerodocumento, $celular, $correo, $sedes, $programa, $formulario, $utm_source, $utm_medium, $utm_campaign, $utm_term, $utm_content, $gclid, $fecha);
                if ($cnx->query($sql) === TRUE) {
                    echo json_encode(array('rpta' => 'ok' ));
                } else {
                    echo json_encode(array('rpta' => $cnx->error ));
                }
            }

            break;
    }
}

?>
