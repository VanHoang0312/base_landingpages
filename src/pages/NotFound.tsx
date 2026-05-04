import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <p className="text-8xl mb-6">🍽️</p>
        <h1 className="font-display text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl font-semibold text-gray-900 mb-3">Trang không tìm thấy</p>
        <p className="text-gray-400 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="brand-gradient text-white px-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Về trang chủ
            </Button>
          </Link>
          <Link to="/thuc-don">
            <Button variant="outline" className="border-primary text-primary px-8">
              Xem thực đơn
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
