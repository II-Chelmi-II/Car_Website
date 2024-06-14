export async function fetchData<T>(url: string): Promise<T[]> {
    const response = await fetch(url);
    const data: T[] = await response.json();
    return data;
  }
  
  export async function postData<T>(url: string, body: T): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data: T = await response.json();
    return data;
  }
  
  export async function putData<T>(url: string, body: T): Promise<T> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data: T = await response.json();
    return data;
  }
  
  export async function deleteData(url: string): Promise<void> {
    await fetch(url, {
      method: 'DELETE',
    });
  }
  