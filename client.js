class Client {
  fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Error al realizar la solicitud: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Hubo un error", error);
      throw error;
    }
  };

  postData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"cariSec": "TokenCarisec"
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(
          `Error al realizar la solicitud: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Hubo un error", error);
      throw error;
    }
  };
}

export { Client };
