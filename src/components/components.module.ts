import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment';

import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { MediaCapture } from '@ionic-native/media-capture';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Vibration } from '@ionic-native/vibration';
import { Keyboard } from '@ionic-native/keyboard';
import { Device } from '@ionic-native/device';
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from '@ionic-native/file-path';
import { PhotoLibrary } from '@ionic-native/photo-library';

import { SpacesListComponent } from './spaces-list/spaces-list';
import { NotificationComponent } from './notification/notification';
import { PersonComponent } from './person/person';
import { PeopleListComponent } from './people-list/people-list'
import { SpaceComponent } from './space/space';
import { StatusUpdateComponent } from './status-update/status-update';
import { ButtonGroupComponent } from './button-group/button-group';
import { PipesModule } from '../pipes/pipes.modules';
import { StatusModalComponent } from './status-modal/status-modal';
import { ContentCardListComponent } from './content-card-list/content-card-list';
import { ArticleCardComponent } from './entity-cards/article-card/article-card';
import { PhotoCardComponent } from './entity-cards/photo-card/photo-card';
import { IdeaCardComponent } from './entity-cards/idea-card/idea-card';
import { WallCardComponent } from './entity-cards/wall-card/wall-card';
import { UserCardComponent } from './entity-cards/user-card/user-card';
import { ContentProvider } from '../providers/content';
import { SpacesProvider } from '../providers/spaces';
import { TickerComponent } from './ticker/ticker';
import { EventCardComponent } from './entity-cards/event-card/event-card';
import { HomeActivityCardComponent } from './home-activity-card/home-activity-card';
import { ContentLikeComponent } from './content-like/content-like';
import { CommentComponent } from './comment/comment';
import { LoaderComponent } from './loader/loader';
import { ListButtonComponent } from './list-button/list-button';
import { CaseItemComponent } from './case-item/case-item';
import { CaseCommentComponent } from './case-comment/case-comment';
import { BugItemComponent } from './bug-item/bug-item';
import { DiscussionCategoryItemComponent } from './discussion-category-item/discussion-category-item';
import { DefaultHeaderComponent } from './default-header/default-header';
import { PhotoListComponent } from './photo-list/photo-list';
import { PhotoSingleModalComponent } from './photo-single-modal/photo-single-modal';
import { PhotoModalComponent } from './photo-modal/photo-modal';
import { CommentModalComponent } from './comment-modal/comment-modal';
import { CommentsCountComponent } from './comments-count/comments-count';
import { LikeCommentActionsComponent } from './like-comment-actions/like-comment-actions';
import { WriteCommentComponent } from './write-comment/write-comment';
import { SingleContentLikeComponent } from './single-content-like/single-content-like';
import { BlogCardComponent } from './entity-cards/blog-card/blog-card';
import { WikiCardComponent } from './entity-cards/wiki-card/wiki-card';
import { VideoCardComponent } from './entity-cards/video-card/video-card';
import { CaseCommentModalComponent } from './case-comment-modal/case-comment-modal';
import { ProjectSelectComponent } from './case-filter/project-select/project-select';
import { CategorySelectComponent } from './case-filter/category-select/category-select';
import { MilestoneSelectComponent } from './case-filter/milestone-select/milestone-select';
import { StatusSelectComponent } from './case-filter/status-select/status-select';
import { PrioritySelectComponent } from './case-filter/priority-select/priority-select';
import { AssignToSelectComponent } from './case-filter/assign-to-select/assign-to-select';
import { FolderSelectComponent } from './folder-select/folder-select';
import { ForumTopicCommentComponent } from './forum-topic-comment/forum-topic-comment';
import { ForumTopicCommentModalComponent } from './forum-topic-comment-modal/forum-topic-comment-modal';
import { NoResultsFoundComponent } from './no-results-found/no-results-found';
import { SearchingForComponent } from './searching-for/searching-for';
import { CaseCardComponent } from './entity-cards/case-card/case-card';
import { ForumPostCardComponent } from './entity-cards/forum-post-card/forum-post-card';
import { FaIconComponent } from './fa-icon/fa-icon';
import { EmptyCardComponent } from './empty-card/empty-card';
import { FileCardComponent } from './entity-cards/file-card/file-card';
import { EmptyTickerComponent } from './empty-ticker/empty-ticker';
import { EmptyNotificationComponent } from './empty-notification/empty-notification';
import { EmptyCaseCardComponent } from './empty-case-card/empty-case-card';
import { EmptyDiscussionCardComponent } from './empty-discussion-card/empty-discussion-card';
import { EmptyPeopleComponent } from './empty-people/empty-people';
import { AddAttachmentsComponent } from './add-attachments/add-attachments';
import { AddButtonComponent } from './add-button/add-button';
import { TreeFolderComponent } from './tree-folder/tree-folder';
import { AttachFilesComponent } from './attach-files/attach-files';
import { MetaInformationComponent } from './meta-information/meta-information';
import { AddTagsComponent } from './add-tags/add-tags';
import { FeaturedImageComponent } from './featured-image/featured-image';
import { ContentCategoryComponent } from './content-category/content-category';
import { WikiTopicComponent } from './wiki-topic/wiki-topic';
import { EditButtonComponent } from './edit-button/edit-button';
import { AddPhotoComponent } from './add-photo/add-photo';
import { AddStageComponent } from './add-stage/add-stage';
import { CaseSelectSearchComponent } from './case-select-search/case-select-search';
import { AddSpaceComponent } from './add-space/add-space';
import { SpacePhotoComponent } from './space-photo/space-photo';
import { AddForumComponent } from './add-forum/add-forum';
import { ProjectSelectModalComponent } from './case-filter/project-select-modal/project-select-modal';
import { CategorySelectModalComponent } from './case-filter/category-select-modal/category-select-modal';
import { MilestoneSelectModalComponent } from './case-filter/milestone-select-modal/milestone-select-modal';
import { PrioritySelectModalComponent } from './case-filter/priority-select-modal/priority-select-modal';
import { StatusSelectModalComponent } from './case-filter/status-select-modal/status-select-modal';
import { AssignedToSelectModalComponent } from './case-filter/assigned-to-select-modal/assigned-to-select-modal';
import { SpaceForModalComponent } from './space-for-modal/space-for-modal';
import { SpaceListForModalComponent } from './space-list-for-modal/space-list-for-modal';
import { SpaceCardComponent } from './entity-cards/space-card/space-card';
import { AddTaskFollowersComponent } from './add-task-followers/add-task-followers';
import { DropDownSelectComponent } from './drop-down-select/drop-down-select';
import { BackButtonComponent } from './back-button/back-button';
import { OptionSearchComponent } from './option-search/option-search';
import { EventOptionSearchComponent } from './event-option-search/event-option-search';
import { SpacePeopleSelectComponent } from './space-people-select/space-people-select';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ZoomAreaModule } from 'ionic2-zoom-area';
import { CaseAdditionalRecipientComponent } from './case-additional-recipient/case-additional-recipient';
import { DiscussionCategoryComponent } from './discussion-category/discussion-category';
import { DiscussionCategorySelectItemComponent } from './discussion-category-select-item/discussion-category-select-item';
import { UploadVideoComponent } from './upload-video/upload-video';
import { EventResourceComponent } from './event-resource/event-resource';
import { CaseAssignPeopleComponent } from './case-assign-people/case-assign-people';
import { ShowAttachmentsComponent } from './show-attachments/show-attachments';
import { EmptyDiscussionCategoryCardComponent } from './empty-discussion-category-card/empty-discussion-category-card';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { FileOpener } from '@ionic-native/file-opener';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { PeopleRequestComponent } from './people-request/people-request';
import { AnnouncementComponent } from './announcement/announcement';
import { NoAnnouncementFoundComponent } from './no-announcement-found/no-announcement-found';
import { SearchActivityCardComponent } from './search-activity-card/search-activity-card';
import { TypeToSearchComponent } from './type-to-search/type-to-search';

@NgModule({
    declarations: [
        SpacesListComponent,
        NotificationComponent,
        PersonComponent,
        PeopleListComponent,
        SpaceComponent,
        StatusUpdateComponent,
        ButtonGroupComponent,
        StatusModalComponent,
        ContentCardListComponent,
        ArticleCardComponent,
        PhotoCardComponent,
        IdeaCardComponent,
        WallCardComponent,
        WallCardComponent,
        UserCardComponent,
        TickerComponent,
        EventCardComponent,
        HomeActivityCardComponent,
        ContentLikeComponent,
        CommentComponent,
        LoaderComponent,
        ListButtonComponent,
        CaseItemComponent,
        CaseCommentComponent,
        BugItemComponent,
        DiscussionCategoryItemComponent,
        DefaultHeaderComponent,
        PhotoListComponent,
        PhotoSingleModalComponent,
        PhotoModalComponent,
        CommentModalComponent,
        CommentsCountComponent,
        LikeCommentActionsComponent,
        WriteCommentComponent,
        ContentLikeComponent,
        SingleContentLikeComponent,
        BlogCardComponent,
        WikiCardComponent,
        VideoCardComponent,
        CaseCommentModalComponent,
        ProjectSelectComponent,
        CategorySelectComponent,
        MilestoneSelectComponent,
        StatusSelectComponent,
        PrioritySelectComponent,
        AssignToSelectComponent,
        FolderSelectComponent,
        ForumTopicCommentComponent,
        ForumTopicCommentModalComponent,
        NoResultsFoundComponent,
        SearchingForComponent,
        CaseCardComponent,
        ForumPostCardComponent,
        FaIconComponent,
        EmptyCardComponent,
        FileCardComponent,
        EmptyTickerComponent,
        EmptyNotificationComponent,
        EmptyCaseCardComponent,
        EmptyDiscussionCardComponent,
        EmptyPeopleComponent,
        AddAttachmentsComponent,
        AddButtonComponent,
        TreeFolderComponent,
        AttachFilesComponent,
        MetaInformationComponent,
        AddTagsComponent,
        FeaturedImageComponent,
        ContentCategoryComponent,
        WikiTopicComponent,
        EditButtonComponent,
        AddPhotoComponent,
        AddStageComponent,
        CaseSelectSearchComponent,
        AddSpaceComponent,
        SpacePhotoComponent,
        SpacePhotoComponent,
        AddForumComponent,
        ProjectSelectModalComponent,
        CategorySelectModalComponent,
        MilestoneSelectModalComponent,
        PrioritySelectModalComponent,
        StatusSelectModalComponent,
        AssignedToSelectModalComponent,
        SpaceForModalComponent,
        SpaceListForModalComponent,
        SpaceCardComponent,
        AddTaskFollowersComponent,
        DropDownSelectComponent,
        BackButtonComponent,
        OptionSearchComponent,
        EventOptionSearchComponent,
        SpacePeopleSelectComponent,
        CaseAdditionalRecipientComponent,
        DiscussionCategoryComponent,
        DiscussionCategorySelectItemComponent,
        UploadVideoComponent,
        EventResourceComponent,
        CaseAssignPeopleComponent,
        ShowAttachmentsComponent,
        EmptyDiscussionCategoryCardComponent,
    PeopleRequestComponent,
    AnnouncementComponent,
    NoAnnouncementFoundComponent,
    SearchActivityCardComponent,
    TypeToSearchComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
        PipesModule,
        MomentModule,
        // ZoomAreaModule.forRoot()
    ],
    exports: [
        SpacesListComponent,
        NotificationComponent,
        PersonComponent,
        PeopleListComponent,
        SpaceComponent,
        StatusUpdateComponent,
        ButtonGroupComponent,
        StatusModalComponent,
        ContentCardListComponent,
        ArticleCardComponent,
        PhotoCardComponent,
        IdeaCardComponent,
        WallCardComponent,
        WallCardComponent,
        UserCardComponent,
        TickerComponent,
        EventCardComponent,
        HomeActivityCardComponent,
        ContentLikeComponent,
        CommentComponent,
        LoaderComponent,
        ListButtonComponent,
        DefaultHeaderComponent,
        CaseItemComponent,
        CaseCommentComponent,
        BugItemComponent,
        DiscussionCategoryItemComponent,
        PhotoListComponent,
        PhotoSingleModalComponent,
        PhotoModalComponent,
        CommentModalComponent,
        CommentsCountComponent,
        LikeCommentActionsComponent,
        WriteCommentComponent,
        ContentLikeComponent,
        SingleContentLikeComponent,
        BlogCardComponent,
        WikiCardComponent,
        VideoCardComponent,
        CaseCommentModalComponent,
        ProjectSelectComponent,
        CategorySelectComponent,
        MilestoneSelectComponent,
        StatusSelectComponent,
        PrioritySelectComponent,
        AssignToSelectComponent,
        FolderSelectComponent,
        ForumTopicCommentComponent,
        ForumTopicCommentModalComponent,
        NoResultsFoundComponent,
        SearchingForComponent,
        CaseCardComponent,
        ForumPostCardComponent,
        FaIconComponent,
        EmptyCardComponent,
        FileCardComponent,
        EmptyTickerComponent,
        EmptyNotificationComponent,
        EmptyCaseCardComponent,
        EmptyDiscussionCardComponent,
        EmptyPeopleComponent,
        AddAttachmentsComponent,
        AddButtonComponent,
        TreeFolderComponent,
        AttachFilesComponent,
        MetaInformationComponent,
        AddTagsComponent,
        FeaturedImageComponent,
        ContentCategoryComponent,
        WikiTopicComponent,
        EditButtonComponent,
        AddPhotoComponent,
        AddStageComponent,
        CaseSelectSearchComponent,
        AddSpaceComponent,
        SpacePhotoComponent,
        SpacePhotoComponent,
        AddForumComponent,
        ProjectSelectModalComponent,
        CategorySelectModalComponent,
        MilestoneSelectModalComponent,
        PrioritySelectModalComponent,
        StatusSelectModalComponent,
        AssignedToSelectModalComponent,
        SpaceForModalComponent,
        SpaceListForModalComponent,
        SpaceCardComponent,
        AddTaskFollowersComponent,
        DropDownSelectComponent,
        BackButtonComponent,
        OptionSearchComponent,
        EventOptionSearchComponent,
        SpacePeopleSelectComponent,
        CaseAdditionalRecipientComponent,
        DiscussionCategoryComponent,
        DiscussionCategorySelectItemComponent,
        UploadVideoComponent,
        EventResourceComponent,
        CaseAssignPeopleComponent,
        ShowAttachmentsComponent,
        EmptyDiscussionCategoryCardComponent,
    PeopleRequestComponent,
    AnnouncementComponent,
    NoAnnouncementFoundComponent,
    SearchActivityCardComponent,
    TypeToSearchComponent,
    ],
    providers: [
        ContentProvider,
        SpacesProvider,
        Camera,
        File,
        FilePath,
        FileTransfer,
        FileTransferObject,
        FileOpener,
        MediaCapture,
        TapticEngine,
        Keyboard,
        Device,
        FileChooser,
        Vibration,
        IOSFilePicker,
        DocumentViewer,
        PhotoLibrary
    ],
    entryComponents: [
        PhotoModalComponent,
        CommentModalComponent,
        CaseCommentModalComponent,
        ForumTopicCommentModalComponent,
        PhotoSingleModalComponent,
        ProjectSelectModalComponent,
        CategorySelectModalComponent,
        MilestoneSelectModalComponent,
        PrioritySelectModalComponent,
        StatusSelectModalComponent,
        AssignedToSelectModalComponent
    ]
})

export class ComponentsModule { }
