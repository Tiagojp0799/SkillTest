class Exam < ApplicationRecord
  include Math

  belongs_to :patient

  belongs_to :point_po, class_name: "Point", :foreign_key => 'point_po_id', dependent: :destroy
  belongs_to :point_or, class_name: "Point", :foreign_key => 'point_or_id', dependent: :destroy
  belongs_to :point_a, class_name: "Point", :foreign_key => 'point_n_id', dependent: :destroy
  belongs_to :point_n, class_name: "Point", :foreign_key => 'point_a_id', dependent: :destroy

  accepts_nested_attributes_for :point_po
  accepts_nested_attributes_for :point_or
  accepts_nested_attributes_for :point_n
  accepts_nested_attributes_for :point_a

  def maxillary_depth_angle
    m1 = (point_po.y - point_or.y) / (point_po.x - point_or.x);
    anglePoOr = atan(m1) * 180 / PI;

    m2 = (point_n.y - point_a.y) / (point_n.x - point_a.x); 
    angleNA = atan(m2) * 180 / PI;
    
    angle = (anglePoOr - angleNA)

    return angle < 0 ? (angle + 180) : angle
  end

end
