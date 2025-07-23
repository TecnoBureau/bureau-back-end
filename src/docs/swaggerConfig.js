import packageJson from "../../package.json" with { type: "json" };
import config from "../config/config.js";

const version = packageJson.version;

const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "API Bureau",
    version,
    description: "API documentation to Bureau.",
  },
  servers: [
    {
      url: "https://api-bureau.onrender.com/v1/api",
      description: "Render server",
    },
    {
      url: `http://localhost:${config.port}/v1/api`,
      description: "Local server",
    },
  ],
  paths: {
    "/registrations": {
      "get": {
        "summary": "Lista todas as inscrições",
        "responses": {
          "200": {
            "description": "Lista de inscrições retornada com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "registrations": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "fullName": {
                            "type": "string"
                          },
                          "cpf": {
                            "type": "string"
                          },
                          "email": {
                            "type": "string",
                            "format": "email"
                          },
                          "phone": {
                            "type": "string"
                          },
                          "course": {
                            "type": "string"
                          },
                          "ra": {
                            "type": "string"
                          },
                          "period": {
                            "type": "string"
                          },
                          "availability": {
                            "type": "string"
                          },
                          "experience": {
                            "type": "string"
                          },
                          "internshipInterest": {
                            "type": "string"
                          },
                          "programParticipation": {
                            "type": "string"
                          },
                          "previousParticipationDetails": {
                            "type": "string"
                          },
                          "suggestions": {
                            "type": "string"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "__v": {
                            "type": "integer"
                          }
                        }
                      }
                    },
                    "count": {
                      "type": "integer"
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/registrations/csv": {
      get: {
        summary: "Exporta inscrições para CSV",
        responses: {
          200: {
            description: "CSV gerado com sucesso",
            content: {
              "text/csv": {
                schema: {
                  type: "string",
                },
                example: `id,fullName,cpf,email,phone,course,ra,period,availability,experience,internshipInterest,programParticipation,previousParticipationDetails,suggestions,createdAt
1,John Doe,123.456.789-01,john.doe@example.com,(11) 98765-4321,Engineering,2021001234,5th,Afternoon and evening,Previous experience in academic projects,1,0,Participated in 2024/1, helped in organizing events,No suggestions at the moment,2024-07-01T10:30:00.000Z
2,Jane Smith,987.654.321-09,jane.smith@example.com,(22) 12345-6789,Computer Science,2022004321,3rd,Morning,Internship in tech company,0,1,Internship in 2023/2, involved in coding projects,Has suggestions for improving course structure,2024-07-01T11:45:00.000Z`,
              },
            },
          },
          500: {
            description: "Erro ao processar a solicitação",
          },
        },
      },
    },
    "/registrations": {
      post: {
        summary: "Cria uma nova inscrição",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  fullName: {
                    type: "string",
                    example: "John Doe",
                  },
                  cpf: {
                    type: "string",
                    example: "123.456.789-01",
                  },
                  email: {
                    type: "string",
                    example: "john.doe@example.com",
                  },
                  phone: {
                    type: "string",
                    example: "(11) 98765-4321",
                  },
                  course: {
                    type: "string",
                    example: "Engineering",
                  },
                  ra: {
                    type: "string",
                    example: "2021001234",
                  },
                  period: {
                    type: "string",
                    example: "5th",
                  },
                  availability: {
                    type: "string",
                    example: "Afternoon and evening",
                  },
                  experience: {
                    type: "string",
                    example: "Previous experience in academic projects",
                  },
                  internshipInterest: {
                    type: "string",
                    example: "1", // 1 for Yes, 0 for No
                  },
                  programParticipation: {
                    type: "string",
                    example: "0", // 1 for Yes, 0 for No
                  },
                  previousParticipationDetails: {
                    type: "string",
                    example:
                      "Participated in 2024/1, helped in organizing events",
                  },
                  suggestions: {
                    type: "string",
                    example: "No suggestions at the moment",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Inscrição criada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      example: "60e2f6f1b5e9e83177af35c6",
                    },
                    fullName: {
                      type: "string",
                      example: "John Doe",
                    },
                    cpf: {
                      type: "string",
                      example: "123.456.789-01",
                    },
                    email: {
                      type: "string",
                      example: "john.doe@example.com",
                    },
                    phone: {
                      type: "string",
                      example: "(11) 98765-4321",
                    },
                    course: {
                      type: "string",
                      example: "Engineering",
                    },
                    ra: {
                      type: "string",
                      example: "2021001234",
                    },
                    period: {
                      type: "string",
                      example: "5th",
                    },
                    availability: {
                      type: "string",
                      example: "Afternoon and evening",
                    },
                    experience: {
                      type: "string",
                      example: "Previous experience in academic projects",
                    },
                    internshipInterest: {
                      type: "string",
                      example: "1",
                    },
                    programParticipation: {
                      type: "string",
                      example: "0",
                    },
                    previousParticipationDetails: {
                      type: "string",
                      example:
                        "Participated in 2024/1, helped in organizing events",
                    },
                    suggestions: {
                      type: "string",
                      example: "No suggestions at the moment",
                    },
                    createdAt: {
                      type: "string",
                      example: "2024-07-01T10:30:00.000Z",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro de validação dos dados da inscrição",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errors: {
                      type: "object",
                      example: {
                        fullName: "The full name is required",
                        email: "Invalid email format",
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Erro ao processar a solicitação",
          },
        },
      },
    },
    "/health": {
      get: {
        summary: "Verifica o status de saúde da API",
        responses: {
          200: {
            description: "Status da API retornado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" },
                    time: { type: "string", format: "date-time", example: "2024-07-01T10:30:00.000Z" }
                  }
                }
              }
            }
          }
        }
      }
    },
  },
};

export default swaggerConfig;
