// CORS error
export async function getCourseDetails(courseCode: string, srcdb: string) {
    const url = "https://classes.colorado.edu/api/?page=fose&route=details";
    
    const payload = encodeURIComponent(JSON.stringify({ srcdb: srcdb, group: `code:${courseCode.toLowerCase()}` }));

    console.log(payload)
    
    const headers = {
      'accept': 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json',
      'origin': 'https://classes.colorado.edu',
      'priority': 'u=1, i',
      'referer': 'https://classes.colorado.edu/',
      'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      'x-requested-with': 'XMLHttpRequest'
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: payload
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.title ? data.title : "NONE";
    } catch (error) {
      console.error('Error fetching course details:', error);
      return null;
    }
  }
  