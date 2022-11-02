import { Fragment, useCallback, useMemo, useState } from "react";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { FcElectronics, FcLinux, FcPieChart, FcPlus } from "react-icons/fc";
import { Carousel, Report } from "@components";
import { generateUUID } from "@utils";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Form,
  Image,
  Input,
  Layout,
  List,
  Menu,
  Radio,
  Row,
  Space,
  Steps,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import useAntMediaQuery from "use-media-antd-query";

import { Website } from "@types";

import Exemplo1 from "@assets/laws/law_1.gif";
import Exemplo10 from "@assets/laws/law_10.png";
import Exemplo2 from "@assets/laws/law_2.gif";
import Exemplo3 from "@assets/laws/law_3.png";
import Exemplo4 from "@assets/laws/law_4.png";
import Exemplo5 from "@assets/laws/law_5.png";
import Exemplo6 from "@assets/laws/law_6.png";
import Exemplo7 from "@assets/laws/law_7.png";
import Exemplo8 from "@assets/laws/law_8.png";
import Exemplo9 from "@assets/laws/law_9.png";

const { Content } = Layout;

export function Main() {
  const { t } = useTranslation();
  const colSize = useAntMediaQuery();
  const sm = ["xs", "sm"].includes(colSize);

  const [form] = Form.useForm<Website>();
  const [step, setStep] = useState(0);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [sites, setSites] = useState<Array<Website>>([]);

  const onSubmit = useCallback(
    (item: Website) => {
      if (!item.id) item.id = generateUUID();

      setStep(0);
      setSites((sites) => sites.filter((x) => x.id !== item.id).concat(item));
      setIsAddOpen(false);
      form.resetFields();
    },
    [form]
  );

  const onCreate = useCallback(() => {
    setIsAddOpen(true);
    form.resetFields();
  }, [form]);

  const onModify = useCallback(
    (item: Website) => {
      setIsAddOpen(true);
      form.setFieldsValue(item);
    },
    [form]
  );

  const onDrop = useCallback((id: string) => {
    setSites((sites) => sites.filter((x) => x.id !== id));
  }, []);

  const laws = useMemo(
    () => [
      { exemplo: Exemplo1, note: 5 },
      { exemplo: Exemplo2, note: 5 },
      { exemplo: Exemplo3, note: 5 },
      { exemplo: Exemplo4, note: 5 },
      { exemplo: Exemplo5, note: 5 },
      { exemplo: Exemplo6, note: 5 },
      { exemplo: Exemplo7, note: 5 },
      { exemplo: Exemplo8, note: 5 },
      { exemplo: Exemplo9, note: 5 },
      { exemplo: Exemplo10, note: 5 },
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
        <Card
          size={sm ? "small" : "default"}
          title={
            <Row align="middle" gutter={4}>
              <Col style={{ display: "flex", alignItems: "center" }}>
                <FcLinux size={24} />
              </Col>
              <Col>{t("test")}</Col>
            </Row>
          }
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              {/* list */}
              <Card
                hoverable
                type="inner"
                extra={
                  <Button type="ghost" shape="circle" icon={<PlusOutlined />} onClick={onCreate} />
                }
                size={sm ? "small" : "default"}
                title={
                  <Row align="middle" gutter={4}>
                    <Col style={{ display: "flex", alignItems: "center" }}>
                      <FcElectronics size={24} />
                    </Col>
                    <Col>{t("website", { count: 2 })}</Col>
                  </Row>
                }
              >
                <List
                  itemLayout="horizontal"
                  dataSource={sites}
                  renderItem={(item) => (
                    <List.Item
                      extra={
                        <Row gutter={4}>
                          <Col>
                            <Button type="text" shape="circle" onClick={() => onModify(item)}>
                              <Typography.Text type="warning">
                                <EditOutlined />
                              </Typography.Text>
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              danger
                              type="text"
                              shape="circle"
                              onClick={() => onDrop(item.id)}
                            >
                              <Typography.Text type="danger">
                                <DeleteOutlined />
                              </Typography.Text>
                            </Button>
                          </Col>
                        </Row>
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        description={<Tag color="green">{t("concluded")}</Tag>}
                        title={<Typography.Link>{item.link}</Typography.Link>}
                      />
                    </List.Item>
                  )}
                ></List>
              </Card>
            </Col>

            <Col xs={24} md={16}>
              {data.length > 0 && (
                <Card
                  hoverable
                  type="inner"
                  title={
                    <Row align="middle" gutter={4}>
                      <Col style={{ display: "flex", alignItems: "center" }}>
                        <FcPieChart size={24} />
                      </Col>
                      <Col>{t("result")}</Col>
                    </Row>
                  }
                  size={sm ? "small" : "default"}
                >
                  <Report data={data} />
                </Card>
              )}
            </Col>

            {/* add */}
            <Drawer
              open={isAddOpen}
              title={t("add")}
              closable={false}
              height={550}
              placement={sm ? "bottom" : "right"}
              width="50vw"
              onClose={() => setIsAddOpen(false)}
              extra={
                <Button icon={<ArrowLeftOutlined />} onClick={() => setIsAddOpen(false)}>
                  {t("back")}
                </Button>
              }
            >
              <Row>
                <Col xs={24} md={{ span: 20, offset: 2 }}>
                  <Form
                    form={form}
                    scrollToFirstError
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{ laws }}
                    onFinish={onSubmit}
                  >
                    <Row>
                      <Col span={24}>
                        <Form.Item hidden name="id">
                          <Input />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item label={t("link")} name="link" rules={[{ required: true }]}>
                          <Input addonBefore="http://" placeholder="www.google.com" />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Divider />
                      </Col>
                    </Row>

                    <Row justify="center" gutter={[24, 24]}>
                      <Col span={24}>
                        <Steps
                          size="small"
                          current={step}
                          onChange={setStep}
                          percent={(100 * (step + 1)) / 10}
                        >
                          <Steps.Step />
                          <Steps.Step />
                          <Steps.Step />
                          <Steps.Step />
                          <Steps.Step />
                          <Steps.Step />
                          <Steps.Step />
                          <Steps.Step />
                          <Steps.Step />
                          <Steps.Step />
                        </Steps>
                      </Col>

                      <Col span={24}>
                        <Row justify="center">
                          <Col span={2} />

                          <Col span={20} style={{ textAlign: "center" }}>
                            <Typography.Text
                              strong
                              ellipsis={{ tooltip: t(`law${step + 1}.name`) }}
                            >
                              {t(`law${step + 1}.name`)}
                            </Typography.Text>
                          </Col>

                          <Col span={2}>
                            <Tooltip title={t(`law${step + 1}.description`)}>
                              <QuestionCircleOutlined />
                            </Tooltip>
                          </Col>

                          <Col span={24}>
                            <Form.Item shouldUpdate label={t("example")}>
                              {({ getFieldValue }) => (
                                <Image src={getFieldValue(["laws", step, "exemplo"])} />
                              )}
                            </Form.Item>
                          </Col>

                          <Col>
                            <Form.List name="laws">
                              {(fields) => (
                                <Fragment>
                                  {fields.map(({ key, name, ...restField }) => (
                                    <Form.Item
                                      key={key}
                                      {...restField}
                                      label={t("note")}
                                      name={[name, "note"]}
                                      rules={[{ required: true }]}
                                      hidden={step !== name}
                                      noStyle={step !== name}
                                    >
                                      <Radio.Group>
                                        <Space direction={sm ? "vertical" : "horizontal"}>
                                          <Radio value={0}>{t("terrible")}</Radio>
                                          <Radio value={3}>{t("bad")}</Radio>
                                          <Radio value={5}>{t("regular")}</Radio>
                                          <Radio value={7}>{t("good")}</Radio>
                                          <Radio value={10}>{t("great")}</Radio>
                                        </Space>
                                      </Radio.Group>
                                    </Form.Item>
                                  ))}
                                </Fragment>
                              )}
                            </Form.List>
                          </Col>

                          <Col span={24}>
                            <Divider />
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row justify="space-between">
                      <Col>
                        <Button
                          ghost
                          type="primary"
                          disabled={step === 0}
                          onClick={() => setStep((step) => step - 1)}
                        >
                          <ArrowLeftOutlined />
                          {t("previous")}
                        </Button>
                      </Col>

                      <Col hidden={step === 9}>
                        <Button type="primary" onClick={() => setStep((step) => step + 1)}>
                          {t("next")}
                          <ArrowRightOutlined />
                        </Button>
                      </Col>

                      <Col hidden={step !== 9}>
                        <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                          {t("save")}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Drawer>
          </Row>
        </Card>
      </div>
    </Content>
  );
}
