import { useMemo } from "react";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  FormListFieldData,
  Input,
  Layout,
  Radio,
  Row,
  Select,
  Space,
} from "antd";

import { Law, Test, Website } from "@types";

const { Content } = Layout;

export function Main() {
  const [form] = Form.useForm<Test>();

  const generateCardTitle = ({ key, name, ...restField }: FormListFieldData) => (
    <Form.Item
      {...restField}
      name={[name, "link"]}
      rules={[{ required: true, message: "Por favor, insira o link do site" }]}
    >
      <Input
        addonBefore="http://"
        placeholder="www.google.com"
        addonAfter={
          <Form.Item
            noStyle
            {...restField}
            name={[name, "type"]}
            rules={[{ required: true, message: "Por favor, selecione um item da lista" }]}
          >
            <Select placeholder="Tipo">
              <Select.Option key="e-commerce">E-commerce</Select.Option>
              <Select.Option key="streaming">Streaming</Select.Option>
            </Select>
          </Form.Item>
        }
      />
    </Form.Item>
  );

  const laws = useMemo(
    () => [
      {
        name: "Visibilidade do Status do Sistema",
        description:
          "O sistema deve sempre manter os usuários informados sobre o que está acontecendo, por meio de feedback apropriado dentro de um prazo razoável.\nEste feedback é normalmente associado a pontos de ação e pode ser fornecido usando uma mudança de cor, carregador(loading), gráficos de tempo restante etc.",
        note: 0,
      },
      {
        name: "Correspondência entre o Sistema e o Mundo Real",
        description:
          "O sistema deve falar a língua dos usuários, com palavras, frases e conceitos familiares ao usuário, ao invés de termos orientados ao sistema. Siga as convenções do mundo real, fazendo com que as informações apareçam em uma ordem natural e lógica.",
        note: 0,
      },
      {
        name: "Controle e liberdade para o usuário",
        description:
          "Os usuários frequentemente escolhem as funções do sistema por engano e precisarão de uma “saída de emergência” claramente marcada para deixar o estado indesejado sem ter que passar por um diálogo extenso. Suporte para desfazer e refazer.",
        note: 0,
      },
      {
        name: "Consistência e Padronização",
        description:
          "Ainda melhor do que boas mensagens de erro é um design cuidadoso que evita a ocorrência de um problema. Elimine as condições sujeitas a erros ou verifique-as e apresente aos usuários uma opção de confirmação antes de se comprometerem com a ação.",
        note: 0,
      },
      {
        name: "Prevenção de erros",
        description:
          "Os usuários não devem se perguntar se palavras, situações ou ações diferentes significam a mesma coisa.",
        note: 0,
      },
      {
        name: "Reconhecer ao invés de lembrar",
        description:
          "Minimize a carga de memória do usuário, tornando objetos, ações e opções visíveis. O usuário não deve ter que se lembrar de informações de uma parte do diálogo para outra. As instruções de uso do sistema devem ser visíveis ou facilmente recuperáveis quando apropriado.",
        note: 0,
      },
      {
        name: "Eficiência e flexibilidade de uso",
        description:
          "A interface deve atender tanto as necessidades dos usuários leigos quanto a dos experientes, os leigos precisam ter as informações bem detalhadas para conseguirem realizar uma tarefa, mas a medida que vão conhecendo a interface precisam conseguir interagir de forma mais rápida.",
        note: 0,
      },
      {
        name: "Estética e design minimalista",
        description:
          "Quanto maior a quantidade de informações, mais tempo o usuário vai levar para analisá-las e poder tomar uma decisão, aumentando assim as chances dele abandonar a aplicação/site por achar confuso demais.",
        note: 0,
      },
      {
        name: "Ajude os usuários a reconhecerem, diagnosticarem e recuperarem-se de erros",
        description:
          "Caso dê algo de errado, é importante mostrar ao usuário qual foi o erro e como se recuperar dele, para isso, as mensagens de erro devem ser claras e objetivas, em linguagem simples e próximas da ação que causou o erro.",
        note: 0,
      },
      {
        name: "Ajuda e documentação",
        description:
          "Nunca sabemos quando um usuário vai precisar de um auxílio, embora as áreas de documentação e ajuda sejam as menos acessadas, elas devem estar lá, principalmente em interfaces que possuem muitas possibilidades, pois podem ajudar o usuário a resolver um problema sozinho.",
        note: 0,
      },
    ],
    []
  );

  return (
    <Content>
      <div style={{ padding: 24 }}>
        <Card>
          <Form form={form} onFinish={console.info}>
            <Form.List name="sites">
              {(fields, { add, remove }, { errors }) => (
                <Row gutter={24}>
                  {fields.length < 3 && (
                    <Col span={8}>
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add({ laws, link: "", step: 0 })}
                          icon={<PlusOutlined />}
                          style={{ width: "100%", height: 300 }}
                        >
                          Adicionar
                        </Button>
                      </Form.Item>
                    </Col>
                  )}

                  {fields.map(({ key, name, ...restField }) => (
                    <Col key={key} span={8} style={{ display: "flex", alignItems: "stretch" }}>
                      <Card title={generateCardTitle({ key, name, ...restField })}>
                        <Form.Item noStyle shouldUpdate>
                          {({ getFieldValue, setFieldValue }) => {
                            const site = getFieldValue(["sites", name]) as Website;
                            const law = getFieldValue(["sites", name, "laws", site.step]) as Law;

                            return (
                              <div
                                style={{
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 8,
                                }}
                              >
                                <div
                                  style={{
                                    minHeight: 244,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Row gutter={[8, 8]}>
                                    <Col>
                                      <Avatar size="small">{site.step + 1}</Avatar>
                                    </Col>

                                    <Col>{law.name}</Col>

                                    <Col>{law.description}</Col>
                                  </Row>

                                  <Divider />
                                </div>

                                <div style={{ flex: 1 }}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "laws", site.step, "note"]}
                                  >
                                    <Radio.Group>
                                      <Space direction="vertical">
                                        <Radio value={0}>Péssimo</Radio>
                                        <Radio value={2}>Muito ruim</Radio>
                                        <Radio value={4}>Ruim</Radio>
                                        <Radio value={6}>Bom</Radio>
                                        <Radio value={8}>Muito bom</Radio>
                                        <Radio value={10}>Excelente</Radio>
                                      </Space>
                                    </Radio.Group>
                                  </Form.Item>
                                </div>

                                <div>
                                  <Row gutter={24} justify="space-between">
                                    <Col>
                                      <Button
                                        title="Voltar"
                                        disabled={site.step === 0}
                                        icon={<ArrowLeftOutlined />}
                                        shape="circle"
                                        onClick={() =>
                                          setFieldValue(["sites", name, "step"], site.step - 1)
                                        }
                                      />
                                    </Col>

                                    <Col hidden={site.step === 9}>
                                      <Button
                                        title="Próximo"
                                        icon={<ArrowRightOutlined />}
                                        shape="circle"
                                        onClick={() =>
                                          setFieldValue(["sites", name, "step"], site.step + 1)
                                        }
                                      />
                                    </Col>

                                    <Col hidden={site.step !== 9}>
                                      <Button
                                        title="Salvar"
                                        icon={<SaveOutlined />}
                                        shape="circle"
                                        onClick={() => {
                                          setFieldValue(["sites", name, "finish"], true);
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            );
                          }}
                        </Form.Item>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Form.List>
          </Form>
        </Card>
      </div>
    </Content>
  );
}
