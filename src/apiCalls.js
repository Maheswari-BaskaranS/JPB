
import { jpb } from "./config";


export const handleEmployerlogin = async (data) => {

    const url = `${jpb.baseUrl}/EmployerLogIn/GetEmployerLogin`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
  
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred while sending OTP:', error);
      throw error;
    }
  };

  export const handleHelperlogin = async (data) => {

    const url = `${jpb.baseUrl}/HelperLogIn/GetHelperLogin`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
  
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred while sending OTP:', error);
      throw error;
    }
  };


  export const sendRegOTP = async (data) => {
    const url = `${jpb.baseUrl}/SendOTP/SendOTP?OrganizationId=${jpb.OrgId}&Email=${data.Email}&Module=${data.Method}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred while sending OTP:', error);
      throw error;
    }
  };

  export const sendRegForgotOTP = async (data) => {
    const url = `${jpb.baseUrl}/api/SendOTP?OrganizationId=${jpb.OrgId}&Email=${data.Email}&Module=${data.Module}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred while sending OTP:', error);
      throw error;
    }
  };
  


  export const verifyRegOTP = async (data) => {
    const url = `${jpb.baseUrl}/SendOTP/VerifyOTP`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(url, options);
        const responseData = await response.json();
        console.log('API Response:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error occurred while verifying OTP:', error);
        throw error;
    }
};


  
  export const getBranches = async (data) => {

    const url = `${jpb.baseUrl}/Branch/GetAll?OrganizationId=${jpb.OrgId}`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred while fetching helpers list:', error);
      throw error;
    }
  };


  export const createEmployerUser = async (data) => {
    const url = `${jpb.baseUrl}/EmployerRegistration/Registration`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to make order');
      }
      return response.json();
    } catch (error) {
      console.error('Error making order:', error);
      throw error;
    }
  };


  export const createHelperUser = async (data) => {
    const url = `${jpb.baseUrl}/HelperRegistration/Registration`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to make order');
      }
      return response.json();
    } catch (error) {
      console.error('Error making order:', error);
      throw error;
    }
  };

  export const getHelpersList = async (data) => {

    const url = `${jpb.baseUrl}/Helper/GetAll?OrganizationId=${jpb.OrgId}`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred while fetching helpers list:', error);
      throw error;
    }
  };


  export const getFilterList = async (data) => {

    const url = `${jpb.baseUrl}/Helper/GetHelperSearchList?OrganizationId=${jpb.OrgId}`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred while fetching helpers list:', error);
      throw error;
    }
  };



  export const getFilterData = async (data) => {
    const url = new URL(`${jpb.baseUrl}/Helper/GetAllHelperSearch`);
    url.searchParams.append('OrganizationId', jpb.OrgId);
  
    Object.keys(data).forEach(key => {
      // if (data[key] && data[key].length > 0) {
      //   url.searchParams.append(key, Array.isArray(data[key]) ? data[key].join(',') : data[key]);
      // }
      if (data[key] && data[key].length > 0) {
        url.searchParams.append(key, Array.isArray(data[key]) ? data[key][0] : data[key]);
      }
    });
  
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred while fetching helpers list:', error);
      throw error;
    }
  };
  

  export const getHelperData = async (id) => {

    const url = `${jpb.baseUrl}/Helper/GetByCode?OrganizationId=${jpb.OrgId}&CVCode=${id}`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred while fetching helpers list:', error);
      throw error;
    }
  };

  export const scheduleInterview = async (data) => {
    const url = `${jpb.baseUrl}/Interview/Create`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  
    console.log('Request Payload:', data);  // Log the data being sent
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to make order');
      }
      const result = await response.json();
      console.log('Server Response:', result);  // Log the response from the server
      return result;
    } catch (error) {
      console.error('Error making order:', error);
      throw error;
    }
  };
  

export const getNationalityData = async () => {

  const url = `${jpb.baseUrl}/Master/Nationality`;
  const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

  try {
      const response = await fetch(url,options);
      if (!response.ok) {
        throw new Error('Failed to get nationality');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred while fetching helpers list:', error);
      throw error;
    }
};
  
export const getHousingTypeData = async () => {

const url = `${jpb.baseUrl}/Master/HousingType`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get HousingType');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};

export const getJobScopeData = async () => {

const url = `${jpb.baseUrl}/Master/ExpectedJobScope`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get ExpectedJobScope');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};
  

export const getResidentialStatusData = async () => {

const url = `${jpb.baseUrl}/Master/ResidentialStatus`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get ResidentialStatus');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};

export const getRelationshipData = async () => {

  const url = `${jpb.baseUrl}/Master/Relationship`;
  const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
  try {
      const response = await fetch(url,options);
      if (!response.ok) {
        throw new Error('Failed to get Relationship');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred while fetching helpers list:', error);
      throw error;
    }
  };

export const getGenderData = async () => {

const url = `${jpb.baseUrl}/Master/Gender`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get Gender');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};

export const getOccupation = async () => {

  const url = `${jpb.baseUrl}/Master/Occupation`;
  const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
  try {
      const response = await fetch(url,options);
      if (!response.ok) {
        throw new Error('Failed to get Occupation');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred while fetching helpers list:', error);
      throw error;
    }
  };

  export const getRefferal = async () => {

    const url = `${jpb.baseUrl}/Master/Referelmethod`;
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
    try {
        const response = await fetch(url,options);
        if (!response.ok) {
          throw new Error('Failed to get Referelmethod');
        }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error('Error occurred while fetching helpers list:', error);
        throw error;
      }
    };
    export const getMonthlyIncome = async () => {

      const url = `${jpb.baseUrl}/Master/Monthlyincome`;
      const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
      try {
          const response = await fetch(url,options);
          if (!response.ok) {
            throw new Error('Failed to get Monthlyincome');
          }
          const responseData = await response.json();
          return responseData;
        } catch (error) {
          console.error('Error occurred while fetching helpers list:', error);
          throw error;
        }
      };
      export const getTypeofResidence = async () => {

        const url = `${jpb.baseUrl}/Master/TypeofResidence`;
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          };
        
        try {
            const response = await fetch(url,options);
            if (!response.ok) {
              throw new Error('Failed to get TypeofResidence');
            }
            const responseData = await response.json();
            return responseData;
          } catch (error) {
            console.error('Error occurred while fetching helpers list:', error);
            throw error;
          }
        };

export const getRaceCodeData = async () => {

const url = `${jpb.baseUrl}/Master/Race?OrgId=${jpb.OrgId}`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get Race');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};

export const getMaritalStatusData = async () => {

const url = `${jpb.baseUrl}/Master/MaritalStatus`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get MaritalStatus');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};

export const getRegionData = async () => {

const url = `${jpb.baseUrl}/Master/Religion?OrgId=${jpb.OrgId}`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get Region');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};

export const getYearOfAssesmentYearData = async () => {

const url = `${jpb.baseUrl}/Master/YearOfAssesmentYear`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get YearOfAssesmentYear');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};

export const getCountryData = async () => {

const url = `${jpb.baseUrl}/Master/Country`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get Country');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};

export const getSpecializationData = async () => {

const url = `${jpb.baseUrl}/Master/Specialization`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get Specialization');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};

export const getComplexionData = async () => {

const url = `${jpb.baseUrl}/Master/Complexion`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get Complexion');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};

export const getHelperStatusData = async () => {

const url = `${jpb.baseUrl}/Master/HelperStatus`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get HelperStatus');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};

export const getSkillData = async () => {

const url = `${jpb.baseUrl}/Master/SkillMaster?OrgId=${jpb.OrgId}`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get Skill');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};

export const getMedicalData = async () => {

const url = `${jpb.baseUrl}/Master/MedicalCV?OrgId=${jpb.OrgId}`;
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

try {
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error('Failed to get Medical');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error occurred while fetching helpers list:', error);
    throw error;
  }
};