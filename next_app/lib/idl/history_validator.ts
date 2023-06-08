export type HistoryValidator = {
  "version": "0.1.0",
  "name": "history_validator",
  "instructions": [
    {
      "name": "initializeAssociation",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "associationId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initializeReporter",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "reporterType",
          "type": {
            "defined": "ReporterType"
          }
        },
        {
          "name": "address",
          "type": "publicKey"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateReporterStatus",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "status",
          "type": {
            "defined": "ReporterStatus"
          }
        }
      ]
    },
    {
      "name": "createEvent",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "beginning",
          "type": "i64"
        },
        {
          "name": "ending",
          "type": "i64"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateEvent",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "beginning",
          "type": "i64"
        },
        {
          "name": "ending",
          "type": "i64"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    {
      "name": "createFact",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fact",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "beginning",
          "type": "i64"
        },
        {
          "name": "ending",
          "type": "i64"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateFact",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fact",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "beginning",
          "type": "i64"
        },
        {
          "name": "ending",
          "type": "i64"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    {
      "name": "createConnection",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fact",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "connection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createEvidence",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fact",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "evidence",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "evidenceType",
          "type": {
            "defined": "EvidenceType"
          }
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createEvidenceEvaluation",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fact",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "evidence",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "evaluation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "evaluationType",
          "type": {
            "defined": "EvaluationType"
          }
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createConnectionEvaluation",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "event",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "connection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "evaluation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "evaluationType",
          "type": {
            "defined": "EvaluationType"
          }
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "association",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "id",
            "docs": [
              "Association id"
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "reporters",
            "docs": [
              "Reporter amount"
            ],
            "type": "u64"
          },
          {
            "name": "events",
            "docs": [
              "Event amount"
            ],
            "type": "u64"
          },
          {
            "name": "facts",
            "docs": [
              "Fact amount"
            ],
            "type": "u64"
          },
          {
            "name": "authority",
            "docs": [
              "Pubkey of association authority"
            ],
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "evaluation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "account",
            "docs": [
              "Evaluated account"
            ],
            "type": "publicKey"
          },
          {
            "name": "evaluationType",
            "docs": [
              "Type of the evaluation"
            ],
            "type": {
              "defined": "EvaluationType"
            }
          },
          {
            "name": "reporter",
            "docs": [
              "Pubkey of reporter for this event"
            ],
            "type": "publicKey"
          },
          {
            "name": "description",
            "docs": [
              "Evaluation description in JSON string"
            ],
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "evidence",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "id",
            "docs": [
              "Sequentional evidence id"
            ],
            "type": "u64"
          },
          {
            "name": "fact",
            "docs": [
              "Pubkey of fact address"
            ],
            "type": "publicKey"
          },
          {
            "name": "evidenceType",
            "docs": [
              "Type of the evidence"
            ],
            "type": {
              "defined": "EvidenceType"
            }
          },
          {
            "name": "reporter",
            "docs": [
              "Pubkey of reporter for this event"
            ],
            "type": "publicKey"
          },
          {
            "name": "description",
            "docs": [
              "Short description in JSON string"
            ],
            "type": "string"
          },
          {
            "name": "approvals",
            "docs": [
              "Amount of evaluations"
            ],
            "type": "u32"
          },
          {
            "name": "denials",
            "docs": [
              "Amount of evaluations"
            ],
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "connection",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "id",
            "docs": [
              "Sequentioal connection id"
            ],
            "type": "u64"
          },
          {
            "name": "event",
            "docs": [
              "Pubkey of event to which this connection belongs"
            ],
            "type": "publicKey"
          },
          {
            "name": "fact",
            "docs": [
              "Pubkey of fact to which this connection belongs"
            ],
            "type": "publicKey"
          },
          {
            "name": "approvals",
            "docs": [
              "Amount of evaluations"
            ],
            "type": "u32"
          },
          {
            "name": "denials",
            "docs": [
              "Amount of evaluations"
            ],
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "id",
            "docs": [
              "Sequential event id"
            ],
            "type": "u64"
          },
          {
            "name": "associaion",
            "docs": [
              "Pubkey of associaion address"
            ],
            "type": "publicKey"
          },
          {
            "name": "title",
            "docs": [
              "Event title"
            ],
            "type": "string"
          },
          {
            "name": "beginning",
            "docs": [
              "Event begining in unix"
            ],
            "type": "i64"
          },
          {
            "name": "ending",
            "docs": [
              "Event ending in unix"
            ],
            "type": "i64"
          },
          {
            "name": "reporter",
            "docs": [
              "Pubkey of reporter for this event"
            ],
            "type": "publicKey"
          },
          {
            "name": "location",
            "docs": [
              "Loсation where the event took place"
            ],
            "type": "string"
          },
          {
            "name": "connections",
            "docs": [
              "Amount of historical connections"
            ],
            "type": "u64"
          },
          {
            "name": "description",
            "docs": [
              "Event description in JSON string"
            ],
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "fact",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "id",
            "docs": [
              "Sequential fact id"
            ],
            "type": "u64"
          },
          {
            "name": "associaion",
            "docs": [
              "Pubkey of associaion address"
            ],
            "type": "publicKey"
          },
          {
            "name": "title",
            "docs": [
              "Event title"
            ],
            "type": "string"
          },
          {
            "name": "beginning",
            "docs": [
              "Fact begining"
            ],
            "type": "i64"
          },
          {
            "name": "ending",
            "docs": [
              "Fact ending"
            ],
            "type": "i64"
          },
          {
            "name": "reporter",
            "docs": [
              "Pubkey of reporter for this fact"
            ],
            "type": "publicKey"
          },
          {
            "name": "location",
            "docs": [
              "Loсation where the fact took place"
            ],
            "type": "string"
          },
          {
            "name": "description",
            "docs": [
              "Fact description in JSON string"
            ],
            "type": "string"
          },
          {
            "name": "evidences",
            "docs": [
              "Amount of evidences"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "reporter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "associaion",
            "docs": [
              "Pubkey of reporter address"
            ],
            "type": "publicKey"
          },
          {
            "name": "reporterType",
            "docs": [
              "Reporter type"
            ],
            "type": {
              "defined": "ReporterType"
            }
          },
          {
            "name": "status",
            "docs": [
              "Reporter account status"
            ],
            "type": {
              "defined": "ReporterStatus"
            }
          },
          {
            "name": "authority",
            "docs": [
              "Pubkey of reporter address"
            ],
            "type": "publicKey"
          },
          {
            "name": "penaltyPoints",
            "docs": [
              "Penalty points for fictitious information"
            ],
            "type": "u8"
          },
          {
            "name": "name",
            "docs": [
              "Reporter name"
            ],
            "type": "string"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "EvaluationType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Approval"
          },
          {
            "name": "Denial"
          }
        ]
      }
    },
    {
      "name": "EvidenceType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Proof"
          },
          {
            "name": "Refutation"
          }
        ]
      }
    },
    {
      "name": "ReporterType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Validator"
          },
          {
            "name": "Connoisseur"
          },
          {
            "name": "Expert"
          }
        ]
      }
    },
    {
      "name": "ReporterStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Inactive"
          },
          {
            "name": "Active"
          },
          {
            "name": "Blocked"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AuthorityMismatch",
      "msg": "Authority mismatched"
    },
    {
      "code": 6001,
      "name": "AssociationMismatch",
      "msg": "Association mismatched"
    },
    {
      "code": 6002,
      "name": "InsufficientQualifications",
      "msg": "Insufficient qualifications"
    },
    {
      "code": 6003,
      "name": "BlockedReporter",
      "msg": "Reporter has been blocked"
    },
    {
      "code": 6004,
      "name": "InactiveReporter",
      "msg": "Reporter is inactive"
    },
    {
      "code": 6005,
      "name": "InvalidReporter",
      "msg": "Reporter is snvalid"
    },
    {
      "code": 6006,
      "name": "LateUpdate",
      "msg": "It is too late to update"
    },
    {
      "code": 6007,
      "name": "NonSequentialId",
      "msg": "Non-sequential ID"
    },
    {
      "code": 6008,
      "name": "InvalidProgramData",
      "msg": "Invalid program data account"
    },
    {
      "code": 6009,
      "name": "InvalidProgramAccount",
      "msg": "Invalid program account"
    }
  ]
};

export const IDL: HistoryValidator = {
  "version": "0.1.0",
  "name": "history_validator",
  "instructions": [
    {
      "name": "initializeAssociation",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "associationId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initializeReporter",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "reporterType",
          "type": {
            "defined": "ReporterType"
          }
        },
        {
          "name": "address",
          "type": "publicKey"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateReporterStatus",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "status",
          "type": {
            "defined": "ReporterStatus"
          }
        }
      ]
    },
    {
      "name": "createEvent",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "beginning",
          "type": "i64"
        },
        {
          "name": "ending",
          "type": "i64"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateEvent",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "beginning",
          "type": "i64"
        },
        {
          "name": "ending",
          "type": "i64"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    {
      "name": "createFact",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fact",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "beginning",
          "type": "i64"
        },
        {
          "name": "ending",
          "type": "i64"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateFact",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fact",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "beginning",
          "type": "i64"
        },
        {
          "name": "ending",
          "type": "i64"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    {
      "name": "createConnection",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fact",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "connection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createEvidence",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fact",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "evidence",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "evidenceType",
          "type": {
            "defined": "EvidenceType"
          }
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createEvidenceEvaluation",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fact",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "evidence",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "evaluation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "evaluationType",
          "type": {
            "defined": "EvaluationType"
          }
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createConnectionEvaluation",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "association",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reporter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "event",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "connection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "evaluation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "evaluationType",
          "type": {
            "defined": "EvaluationType"
          }
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "association",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "id",
            "docs": [
              "Association id"
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "reporters",
            "docs": [
              "Reporter amount"
            ],
            "type": "u64"
          },
          {
            "name": "events",
            "docs": [
              "Event amount"
            ],
            "type": "u64"
          },
          {
            "name": "facts",
            "docs": [
              "Fact amount"
            ],
            "type": "u64"
          },
          {
            "name": "authority",
            "docs": [
              "Pubkey of association authority"
            ],
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "evaluation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "account",
            "docs": [
              "Evaluated account"
            ],
            "type": "publicKey"
          },
          {
            "name": "evaluationType",
            "docs": [
              "Type of the evaluation"
            ],
            "type": {
              "defined": "EvaluationType"
            }
          },
          {
            "name": "reporter",
            "docs": [
              "Pubkey of reporter for this event"
            ],
            "type": "publicKey"
          },
          {
            "name": "description",
            "docs": [
              "Evaluation description in JSON string"
            ],
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "evidence",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "id",
            "docs": [
              "Sequentional evidence id"
            ],
            "type": "u64"
          },
          {
            "name": "fact",
            "docs": [
              "Pubkey of fact address"
            ],
            "type": "publicKey"
          },
          {
            "name": "evidenceType",
            "docs": [
              "Type of the evidence"
            ],
            "type": {
              "defined": "EvidenceType"
            }
          },
          {
            "name": "reporter",
            "docs": [
              "Pubkey of reporter for this event"
            ],
            "type": "publicKey"
          },
          {
            "name": "description",
            "docs": [
              "Short description in JSON string"
            ],
            "type": "string"
          },
          {
            "name": "approvals",
            "docs": [
              "Amount of evaluations"
            ],
            "type": "u32"
          },
          {
            "name": "denials",
            "docs": [
              "Amount of evaluations"
            ],
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "connection",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "id",
            "docs": [
              "Sequentioal connection id"
            ],
            "type": "u64"
          },
          {
            "name": "event",
            "docs": [
              "Pubkey of event to which this connection belongs"
            ],
            "type": "publicKey"
          },
          {
            "name": "fact",
            "docs": [
              "Pubkey of fact to which this connection belongs"
            ],
            "type": "publicKey"
          },
          {
            "name": "approvals",
            "docs": [
              "Amount of evaluations"
            ],
            "type": "u32"
          },
          {
            "name": "denials",
            "docs": [
              "Amount of evaluations"
            ],
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "id",
            "docs": [
              "Sequential event id"
            ],
            "type": "u64"
          },
          {
            "name": "associaion",
            "docs": [
              "Pubkey of associaion address"
            ],
            "type": "publicKey"
          },
          {
            "name": "title",
            "docs": [
              "Event title"
            ],
            "type": "string"
          },
          {
            "name": "beginning",
            "docs": [
              "Event begining in unix"
            ],
            "type": "i64"
          },
          {
            "name": "ending",
            "docs": [
              "Event ending in unix"
            ],
            "type": "i64"
          },
          {
            "name": "reporter",
            "docs": [
              "Pubkey of reporter for this event"
            ],
            "type": "publicKey"
          },
          {
            "name": "location",
            "docs": [
              "Loсation where the event took place"
            ],
            "type": "string"
          },
          {
            "name": "connections",
            "docs": [
              "Amount of historical connections"
            ],
            "type": "u64"
          },
          {
            "name": "description",
            "docs": [
              "Event description in JSON string"
            ],
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "fact",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "id",
            "docs": [
              "Sequential fact id"
            ],
            "type": "u64"
          },
          {
            "name": "associaion",
            "docs": [
              "Pubkey of associaion address"
            ],
            "type": "publicKey"
          },
          {
            "name": "title",
            "docs": [
              "Event title"
            ],
            "type": "string"
          },
          {
            "name": "beginning",
            "docs": [
              "Fact begining"
            ],
            "type": "i64"
          },
          {
            "name": "ending",
            "docs": [
              "Fact ending"
            ],
            "type": "i64"
          },
          {
            "name": "reporter",
            "docs": [
              "Pubkey of reporter for this fact"
            ],
            "type": "publicKey"
          },
          {
            "name": "location",
            "docs": [
              "Loсation where the fact took place"
            ],
            "type": "string"
          },
          {
            "name": "description",
            "docs": [
              "Fact description in JSON string"
            ],
            "type": "string"
          },
          {
            "name": "evidences",
            "docs": [
              "Amount of evidences"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "reporter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "docs": [
              "Account version"
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "docs": [
              "Seed bump for PDA"
            ],
            "type": "u8"
          },
          {
            "name": "associaion",
            "docs": [
              "Pubkey of reporter address"
            ],
            "type": "publicKey"
          },
          {
            "name": "reporterType",
            "docs": [
              "Reporter type"
            ],
            "type": {
              "defined": "ReporterType"
            }
          },
          {
            "name": "status",
            "docs": [
              "Reporter account status"
            ],
            "type": {
              "defined": "ReporterStatus"
            }
          },
          {
            "name": "authority",
            "docs": [
              "Pubkey of reporter address"
            ],
            "type": "publicKey"
          },
          {
            "name": "penaltyPoints",
            "docs": [
              "Penalty points for fictitious information"
            ],
            "type": "u8"
          },
          {
            "name": "name",
            "docs": [
              "Reporter name"
            ],
            "type": "string"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "EvaluationType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Approval"
          },
          {
            "name": "Denial"
          }
        ]
      }
    },
    {
      "name": "EvidenceType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Proof"
          },
          {
            "name": "Refutation"
          }
        ]
      }
    },
    {
      "name": "ReporterType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Validator"
          },
          {
            "name": "Connoisseur"
          },
          {
            "name": "Expert"
          }
        ]
      }
    },
    {
      "name": "ReporterStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Inactive"
          },
          {
            "name": "Active"
          },
          {
            "name": "Blocked"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AuthorityMismatch",
      "msg": "Authority mismatched"
    },
    {
      "code": 6001,
      "name": "AssociationMismatch",
      "msg": "Association mismatched"
    },
    {
      "code": 6002,
      "name": "InsufficientQualifications",
      "msg": "Insufficient qualifications"
    },
    {
      "code": 6003,
      "name": "BlockedReporter",
      "msg": "Reporter has been blocked"
    },
    {
      "code": 6004,
      "name": "InactiveReporter",
      "msg": "Reporter is inactive"
    },
    {
      "code": 6005,
      "name": "InvalidReporter",
      "msg": "Reporter is snvalid"
    },
    {
      "code": 6006,
      "name": "LateUpdate",
      "msg": "It is too late to update"
    },
    {
      "code": 6007,
      "name": "NonSequentialId",
      "msg": "Non-sequential ID"
    },
    {
      "code": 6008,
      "name": "InvalidProgramData",
      "msg": "Invalid program data account"
    },
    {
      "code": 6009,
      "name": "InvalidProgramAccount",
      "msg": "Invalid program account"
    }
  ]
};
