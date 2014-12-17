class AddCommentsToMarkers < ActiveRecord::Migration
  def change
    add_column :markers, :comment, :text

  end
end
