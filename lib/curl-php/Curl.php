<?php
/**
* 
*/
class Curl
{

	public function httpPost($url, $dados = null, $headers = null)
	{

	    try {
		    $ch = curl_init();

		    if (FALSE === $ch)
		        throw new Exception('failed to initialize');

		    curl_setopt($ch, CURLOPT_URL, $url);
		    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			if($dados !== null){
		    	curl_setopt($ch, CURLOPT_POSTFIELDS, $dados);
		    }
			// curl_setopt($ch, CURLOPT_POST, 1);
			if($headers !== null){
		    	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers );
		    }

		    $content = curl_exec($ch);
		    print curl_error($ch);

		    if (FALSE === $content)
		        throw new Exception(curl_error($ch), curl_errno($ch));

		    return $content;

		} catch(Exception $e) {

		    trigger_error(sprintf(
		        'Curl failed with error #%d: %s',
		        $e->getCode(), $e->getMessage()),
		        E_USER_ERROR);

		    return false;

		}

		curl_close($ch);

	}


	public function httpGet($url, $headers = null)
	{

		try {
		    $ch = curl_init();

		    if (FALSE === $ch)
		        throw new Exception('failed to initialize');

		    curl_setopt($ch, CURLOPT_URL, $url);
		    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			//curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
			//curl_setopt($ch, CURLOPT_VERBOSE, 1);
			//curl_setopt($ch, CURLOPT_HEADER, 1);
			if($headers !== null){
		    	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers );
		    }

			$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

		    $content = curl_exec($ch);
		    print curl_error($ch);

		    if (FALSE === $content)
		        throw new Exception(curl_error($ch), curl_errno($ch));

		    return $content;

		} catch(Exception $e) {

		    trigger_error(sprintf(
		        'Curl failed with error #%d: %s',
		        $e->getCode(), $e->getMessage()),
		        E_USER_ERROR);

		    return false;
		}

		curl_close($ch);

	}


	public function httpDelete($url, $headers = null)
	{

		try {
		    $ch = curl_init();

		    if (FALSE === $ch)
		        throw new Exception('failed to initialize');

		    curl_setopt($ch, CURLOPT_URL, $url);
		    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
			//curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
			//curl_setopt($ch, CURLOPT_VERBOSE, 1);
			//curl_setopt($ch, CURLOPT_HEADER, 1);
			if($headers !== null){
		    	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers );
		    }

			$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

		    $content = curl_exec($ch);
		    print curl_error($ch);

		    if (FALSE === $content)
		        throw new Exception(curl_error($ch), curl_errno($ch));

		    return $content;

		} catch(Exception $e) {

		    trigger_error(sprintf(
		        'Curl failed with error #%d: %s',
		        $e->getCode(), $e->getMessage()),
		        E_USER_ERROR);

		    return false;
		}

		curl_close($ch);

	}

	public function teste($msg){
		return $msg;
	}

}