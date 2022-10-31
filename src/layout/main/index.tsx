import { useCallback, useMemo, useState } from "react";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { FcElectronics, FcLinux, FcOk, FcPieChart, FcPlus, FcReadingEbook } from "react-icons/fc";
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
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [sites, setSites] = useState<Array<Website>>([]);

  const onSubmit = useCallback(
    (item: Website) => {
      if (!item.id) item.id = generateUUID();

      setSites((sites) => sites.filter((x) => x.id !== item.id).concat(item));
      setIsAddOpen(false);
      form.resetFields();
    },
    [form]
  );

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
      {
        exemplo: Exemplo1,
        note: 2,
      },
      {
        exemplo: Exemplo2,
        note: 2,
      },
      {
        exemplo: Exemplo3,
        note: 2,
      },
      {
        exemplo: Exemplo4,
        note: 2,
      },
      {
        exemplo: Exemplo5,
        note: 2,
      },
      {
        exemplo: Exemplo6,
        note: 2,
      },
      {
        exemplo: Exemplo7,
        note: 2,
      },
      {
        exemplo: Exemplo8,
        note: 2,
      },
      {
        exemplo: Exemplo9,
        note: 2,
      },
      {
        exemplo: Exemplo10,
        note: 2,
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

  const extra = (
    <Dropdown
      overlay={
        <Menu
          items={[
            {
              key: "add",
              label: t("add"),
              icon: <FcPlus size={20} />,
              onClick: () => setIsAddOpen(true),
            },
          ]}
        />
      }
    >
      <MoreOutlined />
    </Dropdown>
  );

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
              <Card
                hoverable
                type="inner"
                extra={extra}
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

                    <Row>
                      <Col span={24}>
                        <Form.List name="laws">
                          {(fields) => (
                            <Carousel
                              arrows
                              dots={false}
                              speed={800}
                              infinite={true}
                              slidesToShow={1}
                              slidesToScroll={1}
                              initialSlide={0}
                            >
                              {fields.map(({ key, name, ...restField }) => (
                                <div key={key}>
                                  <Row
                                    justify="space-between"
                                    style={{ marginLeft: 8, marginRight: 8 }}
                                    gutter={4}
                                  >
                                    <Col span={2}>
                                      <Tag
                                        color="blue"
                                        style={{ width: "100%", textAlign: "center" }}
                                      >
                                        <Typography.Text strong>{name + 1}</Typography.Text>
                                      </Tag>
                                    </Col>

                                    <Col span={20} style={{ textAlign: "center" }}>
                                      <Tag color="blue" style={{ width: "100%" }}>
                                        <Typography.Text
                                          strong
                                          ellipsis={{ tooltip: t(`law${name + 1}.name`) }}
                                        >
                                          {t(`law${name + 1}.name`)}
                                        </Typography.Text>
                                      </Tag>
                                    </Col>

                                    <Col span={2}>
                                      <Tooltip title={t(`law${name + 1}.description`)}>
                                        <Tag color="blue">
                                          <QuestionCircleOutlined />
                                        </Tag>
                                      </Tooltip>
                                    </Col>

                                    <Col span={24}>
                                      <Divider />
                                    </Col>

                                    <Col span={24}>
                                      <Form.Item shouldUpdate {...restField} label={t("example")}>
                                        {({ getFieldValue }) => (
                                          <Image src={getFieldValue(["laws", name, "exemplo"])} />
                                        )}
                                      </Form.Item>
                                    </Col>

                                    <Col span={24}>
                                      <Divider />
                                    </Col>

                                    <Col span={24}>
                                      <Form.Item
                                        {...restField}
                                        label={t("note")}
                                        name={[name, "note"]}
                                        rules={[{ required: true }]}
                                      >
                                        <Radio.Group>
                                          <Space direction={sm ? "vertical" : "horizontal"}>
                                            <Radio value={2}>{t("terrible")}</Radio>
                                            <Radio value={4}>{t("bad")}</Radio>
                                            <Radio value={6}>{t("good")}</Radio>
                                            <Radio value={8}>{t("very_good")}</Radio>
                                            <Radio value={10}>{t("great")}</Radio>
                                          </Space>
                                        </Radio.Group>
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </div>
                              ))}
                            </Carousel>
                          )}
                        </Form.List>
                      </Col>
                    </Row>

                    <Row justify="space-between" gutter={16}>
                      <Col span={12}>
                        <Button block>{t("cancel")}</Button>
                      </Col>
                      <Col span={12}>
                        <Button block type="primary" icon={<SaveOutlined />} htmlType="submit">
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
