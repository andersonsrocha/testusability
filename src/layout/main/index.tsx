import { Fragment, useCallback, useMemo, useState } from "react";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Form,
  Image,
  Input,
  Layout,
  List,
  Modal,
  Radio,
  Result,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { Report } from "@components";
import { generateUUID } from "@utils";
import { useTranslation } from "react-i18next";

import { Website } from "@types";

import Exemplo1 from "@assets/laws/law_1.gif";
import Exemplo2 from "@assets/laws/law_2.gif";
import Exemplo3 from "@assets/laws/law_3.png";
import Exemplo4 from "@assets/laws/law_4.png";
import Exemplo5 from "@assets/laws/law_5.png";
import Exemplo6 from "@assets/laws/law_6.png";
import Exemplo7 from "@assets/laws/law_7.png";
import Exemplo8 from "@assets/laws/law_8.png";
import Exemplo9 from "@assets/laws/law_9.png";
import Exemplo10 from "@assets/laws/law_10.png";

const { Content } = Layout;

export function Main() {
  const { t } = useTranslation();

  const [form] = Form.useForm<Website>();
  const [step, setStep] = useState(0);
  const [sites, setSites] = useState<Array<Website>>([]);

  const onSubmit = useCallback(
    (item: Website) => {
      setStep(0);
      setSites((sites) => sites.filter((x) => x.id !== item.id).concat(item));
      form.resetFields();
    },
    [form]
  );

  const onModify = useCallback(
    (item: Website) => {
      form.setFieldsValue(item);
    },
    [form]
  );

  const onDrop = useCallback((id: string) => {
    setSites((sites) => sites.filter((x) => x.id !== id));
  }, []);

  const laws = useMemo(
    () => [
      {
        exemplo: Exemplo1,
        note: 0,
      },
      {
        exemplo: Exemplo2,
        note: 0,
      },
      {
        exemplo: Exemplo3,
        note: 0,
      },
      {
        exemplo: Exemplo4,
        note: 0,
      },
      {
        exemplo: Exemplo5,
        note: 0,
      },
      {
        exemplo: Exemplo6,
        note: 0,
      },
      {
        exemplo: Exemplo7,
        note: 0,
      },
      {
        exemplo: Exemplo8,
        note: 0,
      },
      {
        exemplo: Exemplo9,
        note: 0,
      },
      {
        exemplo: Exemplo10,
        note: 0,
      },
    ],
    []
  );

  const data = sites
    .map((site) =>
      site.laws.map((law, index) => ({
        law: String(index + 1),
        site: site.link,
        score: law.note,
      }))
    )
    .flat();

  return (
    <Content>
      <div style={{ padding: 24 }}>
        <Card title={t("test")} bodyStyle={{ minHeight: 600 }}>
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <Card title={t("add")} hoverable>
                {sites.length === 8 && (
                  <Result
                    status="success"
                    title={`${t("concluded")}!`}
                    subTitle={t("concluded_description")}
                  />
                )}

                {sites.length < 8 && (
                  <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{ id: generateUUID(), laws }}
                    onFinish={(values) => {
                      if (step < 10) {
                        setStep((step) => step + 1);
                      } else {
                        onSubmit(values);
                      }
                    }}
                  >
                    <Row gutter={16}>
                      <Col>
                        <Form.Item name="id" hidden>
                          <Input />
                        </Form.Item>
                      </Col>

                      <Col hidden={step !== 0} span={24}>
                        <Form.Item label={t("link")} name="link" rules={[{ required: true }]}>
                          <Input addonBefore="http://" placeholder="www.google.com" />
                        </Form.Item>
                      </Col>

                      {step > 0 && (
                        <Col span={24}>
                          <Row justify="space-between">
                            <Col>
                              <Avatar size="small">{step}</Avatar>
                            </Col>

                            <Col>
                              <Typography.Paragraph strong>
                                {t(`law${step}.name`)}
                              </Typography.Paragraph>
                            </Col>

                            <Col>
                              <Tooltip title={t(`law${step}.description`)}>
                                <QuestionCircleOutlined />
                              </Tooltip>
                            </Col>
                          </Row>
                        </Col>
                      )}

                      <Col span={24}>
                        <Divider />
                      </Col>

                      <Col span={24}>
                        <Form.List name="laws">
                          {(fields) => (
                            <Fragment>
                              {fields.map(({ key, name, ...restField }) => (
                                <Fragment key={key}>
                                  <Form.Item
                                    shouldUpdate
                                    {...restField}
                                    label={t("example")}
                                    hidden={step - 1 !== name}
                                    noStyle={step - 1 !== name}
                                  >
                                    {({ getFieldValue }) => (
                                      <Image src={getFieldValue(["laws", name, "exemplo"])} />
                                    )}
                                  </Form.Item>

                                  <Form.Item
                                    {...restField}
                                    label={t("note")}
                                    name={[name, "note"]}
                                    rules={[{ required: true }]}
                                    hidden={step - 1 !== name}
                                    noStyle={step - 1 !== name}
                                  >
                                    <Radio.Group>
                                      <Space direction="vertical">
                                        <Radio value={0}>{t("terrible")}</Radio>
                                        <Radio value={2}>{t("too_bad")}</Radio>
                                        <Radio value={4}>{t("bad")}</Radio>
                                        <Radio value={6}>{t("good")}</Radio>
                                        <Radio value={8}>{t("very_good")}</Radio>
                                        <Radio value={10}>{t("great")}</Radio>
                                      </Space>
                                    </Radio.Group>
                                  </Form.Item>
                                </Fragment>
                              ))}
                            </Fragment>
                          )}
                        </Form.List>
                      </Col>

                      <Col hidden={step < 1} span={24}>
                        <Divider />
                      </Col>

                      <Col span={24}>
                        <Row justify="space-between">
                          <Col>
                            <Button
                              title={t("previous")}
                              disabled={step === 0}
                              icon={<ArrowLeftOutlined />}
                              shape="circle"
                              onClick={() => setStep((step) => step - 1)}
                            />
                          </Col>

                          <Col hidden={step === 10}>
                            <Button
                              title={t("next")}
                              icon={<ArrowRightOutlined />}
                              shape="circle"
                              htmlType="submit"
                            />
                          </Col>

                          <Col hidden={step !== 10}>
                            <Button
                              title={t("save")}
                              shape="circle"
                              icon={<SaveOutlined />}
                              htmlType="submit"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Card>
            </Col>

            <Col span={16}>
              <Row gutter={[24, 24]}>
                <Col span={24}>
                  <Card title={t("website", { count: 2 })} hoverable>
                    <List
                      itemLayout="horizontal"
                      dataSource={sites}
                      renderItem={(item) => (
                        <List.Item
                          extra={
                            <Button
                              danger
                              type="text"
                              shape="circle"
                              icon={<DeleteOutlined />}
                              onClick={() => onDrop(item.id)}
                            />
                          }
                        >
                          <List.Item.Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            description={<Tag color="green">Concluído</Tag>}
                            title={
                              <Typography.Link onClick={() => onModify(item)}>
                                {item.link}
                              </Typography.Link>
                            }
                          />
                        </List.Item>
                      )}
                    ></List>
                  </Card>
                </Col>

                <Col span={24}>
                  {data.length > 0 && (
                    <Card title={t("result")} hoverable>
                      <Report data={data} />
                    </Card>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </Content>
  );
}
