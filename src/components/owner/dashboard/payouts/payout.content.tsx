import {
  Input,
  Button,
  Card,
  Table,
  Tag,
  Dropdown,
  Statistic,
  List,
  Space,
  Typography,
  Row,
  Col,
  Divider,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DownOutlined,
  DollarOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {TransactionHistory, PayoutsSettings} from "./transaction.history";
const { Title, Text } = Typography;

const PayoutsContent = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="m-0">
          Payouts & Transactions
        </Title>
        <Space>
          <Button className="cursor-pointer whitespace-nowrap !rounded-button">
            Last 30 Days <DownOutlined />
          </Button>
          <Button
            type="primary"
            icon={<i className="fas fa-download"></i>}
            className="cursor-pointer whitespace-nowrap !rounded-button"
          >
            Export Statement
          </Button>
        </Space>
      </div>
      <Row gutter={[24, 24]}>
        {/* Stats Cards */}
        <Col xs={24} sm={12} md={6}>
          <Card className="h-full shadow-sm">
            <Statistic
              title="Available Balance"
              value={24580}
              prefix={<DollarOutlined className="text-blue-600 mr-1" />}
              valueStyle={{ color: "#2563EB" }}
              precision={2}
            />
            <div className="mt-2">
              <Button
                type="primary"
                block
                className="cursor-pointer whitespace-nowrap !rounded-button"
              >
                Withdraw Funds
              </Button>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="h-full shadow-sm">
            <Statistic
              title="Pending Balance"
              value={3250}
              prefix={<i className="fas fa-clock text-blue-600 mr-1"></i>}
              valueStyle={{ color: "#2563EB" }}
              precision={2}
            />
            <div className="mt-2 text-xs text-gray-500">
              Available in 3-5 business days
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="h-full shadow-sm">
            <Statistic
              title="Total Earnings"
              value={158920}
              prefix={<i className="fas fa-chart-line text-blue-600 mr-1"></i>}
              valueStyle={{ color: "#2563EB" }}
              precision={2}
            />
            <div className="mt-2 text-xs text-gray-500">
              <span className="text-green-500">↑ 12%</span> from last month
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="h-full shadow-sm">
            <Statistic
              title="Next Payout"
              value={8750}
              prefix={
                <i className="fas fa-calendar-check text-blue-600 mr-1"></i>
              }
              valueStyle={{ color: "#2563EB" }}
              precision={2}
            />
            <div className="mt-2 text-xs text-gray-500">
              Scheduled for June 15, 2025
            </div>
          </Card>
        </Col>
        {/* Transaction History */}
        <Col xs={24}>
          <TransactionHistory />
        </Col>
        {/* Payment Methods */}
        <Col xs={24} md={12}>
          <Card
            title={
              <div className="flex items-center">
                <i className="fas fa-credit-card mr-2 text-blue-600"></i>{" "}
                Payment Methods
              </div>
            }
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className="cursor-pointer whitespace-nowrap !rounded-button"
              >
                Add Method
              </Button>
            }
            className="shadow-sm h-full"
          >
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  id: 1,
                  type: "Bank Account",
                  name: "Chase Business Account",
                  number: "****1234",
                  isDefault: true,
                },
                {
                  id: 2,
                  type: "Bank Account",
                  name: "Wells Fargo Account",
                  number: "****5678",
                  isDefault: false,
                },
                {
                  id: 3,
                  type: "PayPal",
                  name: "Business PayPal",
                  number: "john.doe@email.com",
                  isDefault: false,
                },
              ]}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      key="edit"
                      className="cursor-pointer whitespace-nowrap !rounded-button"
                    >
                      Edit
                    </Button>,
                    <Button
                      type="text"
                      key="remove"
                      className="cursor-pointer whitespace-nowrap !rounded-button"
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <i
                        className={`fas fa-${
                          item.type === "PayPal" ? "paypal" : "university"
                        } text-2xl text-blue-600`}
                      ></i>
                    }
                    title={
                      <div className="flex items-center">
                        {item.name}{" "}
                        {item.isDefault && (
                          <Tag
                            color="blue"
                            className="ml-2 whitespace-nowrap !rounded-button"
                          >
                            Default
                          </Tag>
                        )}
                      </div>
                    }
                    description={
                      <div className="text-gray-500">
                        {item.type} ending in {item.number}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        {/* Payout Schedule */}
        <Col xs={24} md={12}>
          <PayoutsSettings />
        </Col>
      </Row>
    </div>
  );
};

export default PayoutsContent