/**
 * 通用的js插件依赖jquery
 * 
 */

$(function() {
	// 全选按钮
	$('._ckall').bind('click', function() {
		$('._ck').prop('checked', $(this).is(":checked"));
		$('._delete').prop('disabled', !$(this).is(":checked"));
	})
	// 单选安妮
	$('._ck').bind('click', function() {
		$('._delete').prop('disabled', !$('._ck:checked').length > 0);
	})
	// modal关闭时清理modal content，否则有缓存
	$('._modal').on('hidden.bs.modal', function() {
		$(this).removeData('bs.modal');
	});
	 
	// 多选删除
	$('._delete').bind('click', function() {
			if (confirm('确定要删除吗？')) {
				var action = $(this).attr('action');
				$('form').attr('action', action);
				$('form').submit();
				return true;
			}
		return false;

	})
$('input._date').datetimepicker({format:'yyyy-mm-dd',autoclose:true,todayBtn:true,startView: 2,minView: 2});
$('input._datetime').datetimepicker({format:'yyyy-mm-dd hh:mm:ss',autoclose:true,todayBtn:true,startView: 2,minView: 2});	
var __clone=function(){
	var obj=$(this).parents("._input_list_row").clone(true);
	obj.find('input').val('');
	$(this).parents("._input_list_row").after(obj);
 
};

$('._input_list_row_add').on('click',__clone)

$('._input_list_row_remove').on('click',function(){
	$(this).parents("._input_list_row").remove();
});
 
$('._richeditor').froalaEditor({height:300, charCounterCount: false,
	emoticonsUseImage:false,
	imageInsertButtons:['imageBack', '|', 'imageUpload', 'imageByURL'],
	colorsHEXInput: false,
	 toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR','clearFormatting', '|','spellChecker', 'help', '|', 'undo', 'redo'],
	//  pluginsEnabled: ['image','tables', 'link', 'draggable', 'emoticons'],
	language:'zh_cn',
	videoUploadURL:'/system/common/upload',
	fileUploadURL:'/system/common/upload',
	fileUploadURL: '/system/common/upload',
	imageUploadURL:'/system/common/upload'}).on('froalaEditor.image.error', 
		function (e, editor, error, response){
	 alert('上传图片失败 '+error);
	
});
//	 new Quill(id,{theme:'snow'} );

 


$('._createcancel').bind('click',function(){window.history.back()})
$('._updatecancel').bind('click',function(){window.history.back()})




//upload
//if( $.dmUploader || window.dmUploader){
$('._uploadContainer').dmUploader(
			{
				allowedTypes :$(this).attr('fileType')==undefined?"*":$(this).attr('fileType'),
				url :'/system/common/upload',
				dataType : 'json',
			 
				onNewFile:function(id,file){
					$(this).find('input[type=file]').hide();

					if(!$(this).data('name')){
						var inputName=$(this).find('input[type=file]').attr('hidName');
						$(this).data('name',inputName);
						$(this).find("input[type=hidden][name="+inputName+"]").remove();
					}
			
					if(!$(this).data('progress'))
						{
						var progressbar=$("<div>").addClass("progress").html("<div class='progress-bar'></div>");
						$(this).append(progressbar);
						$(this).data('progress',progressbar);
						} 
					$(this).find(".alert").remove();
				},
				onUploadProgress : function(id, percent) {
					var percentStr = percent + '%';
					$(this).find('.progress-bar').css('width',percentStr);
				},
				onUploadSuccess : function(id, data) {
					$(this).parent().find('.progress').remove();
					if(data.code!=0){
						$(this).find('.alert').remove();
						$(this).append($("<div>").addClass("alert alert-danger").html("文件上传失败，请检查服务器配置"));
						$(this).find('input[type=file]').show();
						return ;
					}
					$(this).find('div:hidden').remove();
					var hidvalue=$("<input type='hidden' >").attr('name',$(this).data('name')).val(data.url);
					 var inputfile=$(this).find("input[type=file]");
					 var li=$("<a>").attr('href','javascript:').append("<i class='glyphicon glyphicon-remove'></i>")
					var fileLink=$("<a>").attr("href",data.url).text(data.url);
					var valueNode= $("<div class='_upload_item' >").append(hidvalue).append(fileLink).append(li);
					 li.bind('click',upload_remove);
					 if($(this).attr('multiple')){
						 $(this).append(valueNode); 
					 }else{
						 $(this).find('._upload_item').remove();
						 $(this).append(valueNode); 
					 }
						 
					
					 inputfile.show();
				 
					 
				},
				onUploadError : function(id, message) {
					$(this).find('.alert').remove();
					$(this).append($("<div>").addClass("alert alert-danger").html(message));
					$(this).find('input[type=file]').show();
				},
				onFileTypeError : function(file) {
					$(this).find('.alert').remove();
					$(this).append($("<div>").addClass("alert alert-danger").html("文件类型错误"));
					$(this).find('input[type=file]').show();
				},
				onFileSizeError : function(file) {
					$(this).find('.alert').remove();
					$(this).append($("<div>").addClass("alert alert-danger").html("文件大小超出范围"));
					$(this).find('input[type=file]').show();
				},
			});
//}

function upload_remove(){
	var obj=arguments[0].target;
	var hidname=$(this).parent().find('input[type=hidden]').attr('name');
	$('input[type=file][hidName='+hidname+']').show();
	if($('input[name='+hidname+']').length>1){
		$(this).parent().remove();
	}else{
		$($(obj).parents('div')[0]).find('input[type=hidden]').val('');
		$($(obj).parents('div')[0]).hide();
	}
}
$('._upload_remove').bind('click',upload_remove)

//sidebar auto toggle
$("[data-sidebarskin='toggle']").on('click', function () {
	      var sidebar = $(".control-sidebar");
	      if (sidebar.hasClass("control-sidebar-dark")) {
	        sidebar.removeClass("control-sidebar-dark")
	        sidebar.addClass("control-sidebar-light")
	      } else {
	        sidebar.removeClass("control-sidebar-light")
	        sidebar.addClass("control-sidebar-dark")
	      }
	    });

//select2 
 if($.fn.select2){
	$.fn.select2.defaults.set("theme", "classic");
	$('._select2').select2({
		ajax:{
			    dataType: 'json',
			    delay: 250,
 			    processResults: function (data, params) {
 			    	return {'results':data}
 			    },
			    cache: true
			  },
			  placeholder: '请输入关键词查询',
			  minimumInputLength: 1,
			});
 
 }
 

	  
});
//jquery validate
$.validator.addMethod("Regex",
	        function(value, element, regexp) {
				var reg=new RegExp(regexp);
	        	  return reg.test(value);
	        },
	        "输入有误"
	);
