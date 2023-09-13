<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["videoFile"])) {
    if ($_FILES["videoFile"]["error"] === UPLOAD_ERR_OK) {
        $uploadDir = "uploads/";
        $uploadPath = $uploadDir . basename($_FILES["videoFile"]["name"]);
        move_uploaded_file($_FILES["videoFile"]["tmp_name"], $uploadPath);
        echo "Video successfully upload hui hai!";
    } else {
        echo "Video upload karne mein error aya hai.";
    }
}
?>
<form action="" method="post" enctype="multipart/form-data">
    <input type="file" name="videoFile">
    <input type="submit" value="Video Upload Karein">
</form>
