import mongoose, { model } from 'mongoose';

const { Schema, isValidObjectId } = mongoose;

const schema = new Schema({
  uen: {
    type: String,
    required: true,
    unique: true
  },
  submittedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'organizations'
  },
  createdBy: {
    type: String
  },
  niumData: {
    type: Array,
    required: false
  },
  niumRfiData: {
    type: Array,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  company: {
    companyName: {
      type: String,
      required: false
    },
    website: {
      type: String,
      required: false
    },
    documents: [
      new Schema({
        id: {
          type: Schema.Types.ObjectId,
          required: false
        },
        type: {
          type: String,
          required: false
        },
        number: {
          type: String,
          required: false
        },
        expiryDate: {
          type: String,
          required: false
        },
        issuedDate: {
          type: String,
          required: false
        },
        issuanceCountry: {
          type: String,
          required: false
        }
      }, { _id: false })
    ],
    legalDetails: {
      countryOfRegisteredBusiness: {
        type: String,
        required: false
      },
      uen: {
        type: String,
        required: true,
        unique: true
      },
      entityName: {
        type: String,
        required: false
      },
      historyName: {
        type: String,
        required: false
      },
      registrationDate: {
        type: Date,
        required: false
      },
      entityType: {
        type: String,
        required: false
      },
      companyType: {
        type: String,
        required: false
      },
      businessConstitution: {
        type: String,
        required: false
      },
      entityStatus: {
        type: String,
        required: false
      },
      listedExchange: {
        type: String
      }
    },
    addresses: {
      isSameBusinessAddress: {
        type: Boolean
      },
      registeredAddress: {
        addressLine1: {
          type: String,
          required: false
        },
        addressLine2: {
          type: String,
          required: false
        },
        city: {
          type: String,
          required: false
        },
        state: {
          type: String,
          required: false
        },
        postalCode: {
          type: String,
          required: false
        },
        country: {
          type: String,
          required: false
        },
        blockHouse: {
          type: String,
          required: false
        },
        streetName: {
          type: String,
          required: false
        },
        buildingName: {
          type: String,
          required: false
        },
        level: {
          type: String,
          required: false
        },
        unit: {
          type: String,
          required: false
        }
      },
      principalPlaceOfBusiness: {
        addressLine1: {
          type: String,
          required: false
        },
        addressLine2: {
          type: String,
          required: false
        },
        city: {
          type: String,
          required: false
        },
        state: {
          type: String,
          required: false
        },
        postalCode: {
          type: String,
          required: false
        },
        country: {
          type: String,
          required: false
        },
        blockHouse: {
          type: String,
          required: false
        },
        streetName: {
          type: String,
          required: false
        },
        buildingName: {
          type: String,
          required: false
        },
        level: {
          type: String,
          required: false
        },
        unit: {
          type: String,
          required: false
        }
      }
    },
    sharesDetails: [
      new Schema({
        issuedShareCapital: {
          type: Number,
          required: false
        },
        paidUpShareCapital: {
          type: Number,
          required: false
        },
        shareAllotted: {
          type: Number,
          required: false
        },
        currency: {
          type: String,
          required: false
        },
        shareType: {
          type: String,
          required: false
        }
      }, { _id: false })],
    ssic: {
      primary: {
        code: {
          type: String,
          required: false
        },
        description: {
          type: String,
          required: false
        },
        otherDescription: {
          type: String,
          required: false
        }
      },
      secondary: {
        code: {
          type: String,
          required: false
        },
        description: {
          type: String,
          required: false
        },
        otherDescription: {
          type: String,
          required: false
        }
      }
    },
    businessDetails: {
      businessWebsite: {
        type: String,
        required: false
      },
      doingBusinessAs: {
        type: String,
        required: false
      },
      primaryIndustry: {
        type: String
      }
    },
    riskProfileAssessment: {
      countryOfOperations: [{
        type: String,
        required: false
      }],
      annualTurnover: {
        type: String,
        required: false
      },
      totalEmployees: {
        type: String,
        required: false
      },
      onboardingMode: {
        type: String,
        required: false
      },
      paymentModes: [{
        type: String,
        required: false
      }],
      productServiceComplexity: {
        type: String,
        required: false
      },
      ownershipStructureLayers: {
        type: String,
        required: false
      },
      intendedUseOfAccount: {
        type: String,
        required: false
      },
      transactionCountries: {
        type: [String],
        required: false
      }
    },
    niumExclusive: {
      niumProductType: {
        type: Array,
        default: ['Send', 'Receive', 'Cards'],
        required: false
      },
      niumProgram: {
        type: String,
        // TODO: For current release, we are only supporting SME
        default: 'SME',
        required: false
      }
    },
    artemisExclusive: {
      artemisDomain: {
        type: String,
        required: false
      }
    },
    isActiveCustomer: {
      type: Boolean,
      required: false
    },
    isIncorporated: {
      type: Boolean,
      required: false
    },
    members: [{
      category: {
        type: String // INDIVIDUAL or CORPORATE
      },
      status: {
        type: String
      },
      appointments: [{
        position: {
          type: String
        },
        appointmentDate: {
          type: String
        },
        resignedDate: {
          type: String,
          required: false
        },
        status: {
          type: String
        }
      }],
      documents: [new Schema(
        {
          id: {
            type: String
          },
          type: {
            type: String
          },
          number: {
            type: String,
            required: false
          },
          expiryDate: {
            type: String,
            required: false
          },
          issuedDate: {
            type: String,
            required: false
          },
          issuanceCountry: {
            type: String,
            required: false
          }
        }, { _id: false }
      )],
      corpsecRequirement: {
        guaranteedAmount: {
          type: Number
        },
        currency: {
          type: String
        }
      },
      corporateRepresentativeOf: {
        type: String
      },
      isApplicant: {
        type: Boolean
      },
      keyContact: {
        isAccounting: {
          type: Boolean
        },
        isMarketing: {
          type: Boolean
        },
        isSales: {
          type: Boolean
        },
        isCorpSec: {
          type: Boolean
        }
      },
      artemisExclusive: {
        crpId: {
          type: String
        }
      },
      kycStatus: {
        isIdVerificated: {
          type: Boolean
        },
        isBackgroundScreened: {
          type: Boolean
        }
      },
      // if category == 'CORPORATE'
      companyDetails: {
        documents: [
          new Schema({
            id: {
              type: Schema.Types.ObjectId
            },
            type: {
              type: String
            },
            number: {
              type: String,
              required: false
            },
            expiryDate: {
              type: String,
              required: false
            },
            issuedDate: {
              type: String,
              required: false
            },
            issuanceCountry: {
              type: String,
              required: false
            }
          }, { _id: false })
        ],
        companyName: {
          type: String,
          required: false
        },
        legalDetails: {
          businessRegistrationNumber: {
            type: String,
            required: true
          },
          entityType: {
            type: String,
            required: false
          },
          companyType: {
            type: String,
            required: false
          },
          countryOfRegisteredBusiness: {
            type: String,
            required: false
          },
          registrationDate: {
            type: Date,
            required: false
          },
          businessEntityType: {
            type: String
          }
        },
        riskProfileAssessment: {
          countryOfOperations: [{
            type: String,
            required: false
          }],
          ownershipStructureLayers: {
            type: String,
            required: false
          }
        },
        // 2nd round of ACRA API Call (Directory search API)
        addresses: {
          registeredAddress: {
            addressLine1: {
              type: String,
              required: false
            },
            addressLine2: {
              type: String,
              required: false
            },
            city: {
              type: String,
              required: false
            },
            state: {
              type: String,
              required: false
            },
            postalCode: {
              type: String,
              required: false
            },
            country: {
              type: String,
              required: false
            },
            blockHouse: {
              type: String,
              required: false
            },
            streetName: {
              type: String,
              required: false
            },
            buildingName: {
              type: String,
              required: false
            },
            level: {
              type: String,
              required: false
            },
            unit: {
              type: String,
              required: false
            }
          }
        }
      },
      // if category == 'INDIVIDUAL'
      personDetails: {
        documents: [
          new Schema({
            id: {
              type: Schema.Types.ObjectId
            },
            type: {
              type: String
            },
            number: {
              type: String,
              required: false
            },
            expiryDate: {
              type: String,
              required: false
            },
            issuedDate: {
              type: String,
              required: false
            },
            issuanceCountry: {
              type: String,
              required: false
            }
          }, { _id: false })],
        callFirstName: {
          type: String
        },
        callLastName: {
          type: String
        },
        legalDetails: {
          legalFirstName: {
            type: String
          },
          legalLastName: {
            type: String
          }
        },
        contactDetails: {
          phoneCountry: {
            type: String
          },
          phoneNumber: {
            type: String
          },
          email: {
            type: String
          }
        },
        // 2nd round of ACRA API Call (Person API)
        personalDetails: {
          fullName: {
            type: String
          },
          alias: [{
            type: String
          }],
          gender: {
            type: String
          },
          nationality: {
            type: String
          },
          dateOfBirth: {
            type: String
          },
          countryOfBirth: {
            type: String
          },
          idDocument: {
            type: {
              type: String
            },
            idNumber: {
              type: String
            },
            dateOfIssuance: {
              type: String
            },
            dateOfExpiration: {
              type: String
            }
          }
        },
        address: {
          addressLine1: {
            type: String
          },
          addressLine2: {
            type: String
          },
          city: {
            type: String
          },
          state: {
            type: String
          },
          country: {
            type: String
          },
          postalCode: {
            type: String
          },
          blockHouse: {
            type: String
          },
          streetName: {
            type: String
          },
          buildingName: {
            type: String
          },
          level: {
            type: String
          },
          unit: {
            type: String
          }
        },
        riskProfileAssessment: {
          occupation: {
            type: String
          },
          sourceOfIncome: {
            type: String
          },
          isPep: {
            type: Boolean
          }
        }
      },
      sharesDetails: [{
        shareAllotted: {
          type: Number,
          required: false
        },
        shareType: {
          type: String,
          required: false
        },
        sharePercentage: {
          type: Number,
          required: false
        },
        shareCurrency: {
          type: String,
          required: false
        },
        appointmentDate: {
          type: String,
          required: false
        },
        cessationDate: {
          type: String,
          required: false
        },
        status: {
          type: String,
          required: false
        },
        // No need to be filled at MVP
        holderType: {
          type: String,
          required: false
        }
      }]
    }],
    riskRating: {
      type: String,
      required: false
    }
  }
});

/* eslint no-param-reassign: "error" */
// the rename effect is only changed if population called at model query
schema.set('toJSON', {
  transform: (_doc, ret) => {
    if (!isValidObjectId(ret.organizationId)) {
      ret.organization = ret.organizationId;
      delete ret.organizationId;
    }
  }
});

schema.set('timestamps', true);

const Application = model('applications', schema);

export default Application;
